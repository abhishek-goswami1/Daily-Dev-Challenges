# Day 2 Leaderboard

## Overview

A comprehensive leaderboard display for the Daily Dev Challenge Day 2. Features real-time sorting, searching, and detailed player statistics with badges and achievements.

## Features

- ✅ Dynamic leaderboard with rankings
- ✅ Search functionality by name or username
- ✅ Sort by Score, Time, or Name
- ✅ User rankings with badges (Gold, Silver, Bronze)
- ✅ Achievement badges (Star, Fire, Lightning, Diamond)
- ✅ Completion status indicators
- ✅ Statistics dashboard (Users, Avg Score, Avg Time, Completion Rate)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Smooth animations and transitions
- ✅ Empty state handling

## Columns

### Rank

Shows position with gold/silver/bronze badges for top 3.

### User

Displays user avatar, name, and username.

### Score

Participant's final score in points.

### Time

Time taken to complete all tasks.

### Status

Completion status (Completed/Pending).

### Badges

Earned achievement badges.

## Statistics

- **Total Participants**: Number of people in the challenge
- **Average Score**: Mean score across all participants
- **Average Time**: Mean time to completion
- **Completion Rate**: Percentage of completed challenges

## How to Use

1. Open `index.html` in a web browser
2. Search for specific participants using the search box
3. Sort the leaderboard by Score, Time, or Name
4. View detailed stats at the bottom
5. Hover over badges to see achievement details

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Font Awesome Icons
- Responsive Design

## Data Structure

Each user object contains:

- rank: Position number
- name: Full name
- username: Username handle
- score: Points earned
- time: Time to completion
- status: Completion status
- badges: Array of earned badges

## Responsive Breakpoints

- Desktop: Full table view
- Tablet (768px): Condensed table
- Mobile (480px): Optimized for small screens
