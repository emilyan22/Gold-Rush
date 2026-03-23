import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  doc, 
  setDoc, 
  getDoc,
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
  getDocs,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const LeaderboardContext = createContext();

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within LeaderboardProvider');
  }
  return context;
};

export const LeaderboardProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto-save user's stats to Firestore
  const saveUserStats = async (stats) => {
    if (!currentUser) return;

    try {
      await setDoc(doc(db, 'leaderboard', currentUser.uid), {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: stats.displayName || currentUser.email.split('@')[0],
        budget: stats.budget,
        spent: stats.spent,
        saved: stats.saved,
        savingsPercentage: stats.savingsPercentage,
        budgetLimits: stats.budgetLimits || {},
        spentByCategory: stats.spentByCategory || {},
        lastUpdated: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user stats:', error);
    }
  };

  // Validates email format
  const isValidEmail = (email) => {
    const trimmed = email.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmed);
  };

  // Add a friend by email
  const addFriend = async (friendEmail) => {
    if (!currentUser) return false;

    const email = friendEmail.trim().toLowerCase();
    if (!email) {
      alert('⚠️ Please enter an email address');
      return false;
    }

    if (!isValidEmail(email)) {
      alert('⚠️ Please enter a valid email address');
      return false;
    }

    if (email === (currentUser.email || '').toLowerCase()) {
      alert('⚠️ You cannot add yourself as a friend');
      return false;
    }

    try {
      // Check if user exists in the system (has a leaderboard entry)
      const userQuery = query(
        collection(db, 'leaderboard'),
        where('email', '==', email)
      );
      const snapshot = await getDocs(userQuery);

      if (snapshot.empty) {
        alert('⚠️ No user found with that email. They need to sign up for Gold Rush first!');
        return false;
      }

      // Check if already friends
      const userDocRef = doc(db, 'leaderboard', currentUser.uid);
      const userSnap = await getDoc(userDocRef);
      const existingFriends = (userSnap.exists() ? userSnap.data().friends : []) || [];
      if (existingFriends.map((f) => (f || '').toLowerCase()).includes(email)) {
        alert('⚠️ You\'re already friends with that person!');
        return false;
      }

      // Add friend email to current user's friends array
      await setDoc(userDocRef, {
        friends: arrayUnion(email)
      }, { merge: true });

      alert(`✅ Added ${email} as a friend!`);
      return true;
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('⚠️ Could not add friend. Please try again.');
      return false;
    }
  };

  // Listen to current user's data and friends
  useEffect(() => {
    if (!currentUser) {
      setFriendsLeaderboard([]);
      setFriends([]);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'leaderboard', currentUser.uid);
    
    const unsubscribeUser = onSnapshot(userDocRef, async (userSnap) => {
      if (!userSnap.exists()) {
        setFriends([]);
        setFriendsLeaderboard([]);
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      const friendEmails = userData.friends || [];
      setFriends(friendEmails);

      // Now fetch leaderboard data for all friends
      const leaderboardQuery = query(
        collection(db, 'leaderboard'),
        orderBy('saved', 'desc')
      );

      const unsubscribeLeaderboard = onSnapshot(leaderboardQuery, (snapshot) => {
        const allUsers = [];
        snapshot.forEach((doc) => {
          allUsers.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // Filter to show friends + current user (emails compared case-insensitive)
        const friendEmailsLower = friendEmails.map((e) => (e || '').toLowerCase());
        const filteredLeaderboard = allUsers.filter(user =>
          friendEmailsLower.includes((user.email || '').toLowerCase()) || user.uid === currentUser.uid
        );

        setFriendsLeaderboard(filteredLeaderboard);
        setLoading(false);
      }, (error) => {
        console.error('Error listening to leaderboard:', error);
        setLoading(false);
      });

      return () => unsubscribeLeaderboard();
    }, (error) => {
      console.error('Error listening to user:', error);
      setLoading(false);
    });

    return () => unsubscribeUser();
  }, [currentUser]);

  const value = {
    friendsLeaderboard,
    friends,
    loading,
    saveUserStats,
    addFriend,
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};
