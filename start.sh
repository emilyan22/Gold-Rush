#!/bin/bash

# Gold Rush Quick Start Script
# Run this to set up and start the Gold Rush dashboard

echo "🏴‍☠️ Gold Rush Dashboard - Quick Start 🏴‍☠️"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo ""
    echo "📝 IMPORTANT: Edit .env and add your Plaid credentials:"
    echo "   1. Go to https://plaid.com and sign up (free)"
    echo "   2. Copy PLAID_CLIENT_ID and PLAID_SECRET"
    echo "   3. Paste them into .env"
    echo ""
fi

# Start the server
echo ""
echo "🚀 Starting Gold Rush server..."
echo "======================================"
echo "Server running on: http://localhost:3001"
echo "Dashboard: Open gold_rush_visual_dashboard.html in your browser"
echo "======================================"
echo ""

npm start
