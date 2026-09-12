# Vibe Reset

Role

You are a Senior Full-Stack Developer, UI/UX Designer, and Product Architect.

I am a beginner learning Full-Stack Development, so build this project in a way that is clean, understandable, modular, and beginner-friendly. Do not unnecessarily overcomplicate the code.

Project

Build a full-stack web application called "VibeReset" — a mind-refreshing and relaxation platform for people who feel frustrated, mentally tired, bored, overwhelmed, or stressed from:

Studying

College

Work/job

Coding

Long screen time

Exams

Daily responsibilities

General mental fatigue

The main idea is:

"Take a break. Reset your mind. Come back better."

The application should provide short, interactive activities that help users take a refreshing break instead of endlessly scrolling social media.

The app should feel fun, modern, playful, energetic, Gen-Z, and visually refreshing.

Tech Stack

Frontend

Next.js

TypeScript

Tailwind CSS

Zustand for state management

Responsive design

Component-based architecture

Backend

Node.js

Express.js

REST APIs

Database

Supabase

PostgreSQL

Recommended additional technologies

Use only when genuinely useful:

Lucide React for icons

Framer Motion for animations

Zod for validation

React Hook Form for forms

Do not add unnecessary libraries.

Design Direction

The application should have a funky Gen-Z aesthetic.

Visual style

Use:

Neo colours

Neon green

Electric purple

Hot pink

Cyan

Bright yellow

Deep black/dark backgrounds

Glassmorphism where appropriate

Soft gradients

Rounded cards

Bold typography

Playful illustrations

Floating elements

Micro-interactions

Smooth animations

Large buttons

Modern dashboard layouts

The design should feel like:

Spotify + Duolingo + modern Gen-Z productivity apps + playful wellness app

But do not copy any existing application's design.

Core User Experience

When a user opens the website, the first question should essentially be:

"How are you feeling right now?"

Give users different moods/states such as:

😵‍💫 Overwhelmed

😫 Frustrated

😴 Tired

😐 Bored

😤 Angry

😔 Low

🧠 Mentally exhausted

😌 Just need a break

✨ Feeling good

Based on the selected mood, recommend appropriate activities.

Pages

Create the following pages.

1. Landing Page

Create an attractive hero section.

Headline:

Your brain called. It needs a break. 🧠✨

Subheading:

Reset your mind, recharge your energy, and get back to what matters.

Buttons:

Reset My Mind

Explore Activities

Include:

Animated background

Floating shapes

Neon gradients

Short explanation of the app

Feature cards

"How it works" section

Popular activities

Benefits

Final CTA

Footer

2. Mood Check-In

Create a mood selection page.

Ask:

What's your current vibe?

Show interactive mood cards.

After selecting a mood, recommend activities based on that mood.

For example:

If frustrated

Recommend:

Breathing exercise

Quick game

Rage-release activity

Music break

If tired

Recommend:

2-minute breathing

Eye relaxation

Stretching

Calm sounds

If bored

Recommend:

Mini games

Random fun challenge

Drawing activity

Music

If overwhelmed

Recommend:

Guided breathing

Brain dump

Focus reset

Meditation

3. Activity Dashboard

Create a dashboard containing different categories.

Categories

🧘 Calm

Breathing exercise

2-minute meditation

Relaxation timer

Body scan

🎮 Play

Memory game

Reaction game

Number challenge

Mini puzzle

Rock Paper Scissors

🎨 Create

Digital doodle board

Random drawing challenge

Colour mixer

Creative prompts

🎵 Vibe

Ambient sounds

Rain sounds

Lo-fi atmosphere

Nature sounds

🧠 Reset

Brain dump

Gratitude journal

Mood check-in

"What's bothering you?" reflection

⚡ Energy

Quick stretching

Shake-it-off timer

30-second movement challenge

Eye break

4. Breathing Exercise

Create an interactive breathing experience.

Example:

Breathe In → Hold → Breathe Out

Show an animated circle that expands and contracts.

Include:

1-minute session

2-minute session

5-minute session

Show a timer.

After completion:

Nice. Your brain just got a mini reboot. 🔄🧠

Allow the user to start another activity.

5. Relaxation Timer

Create a customizable timer.

Options:

1 minute

2 minutes

5 minutes

10 minutes

Custom

Include relaxing animations.

When the timer finishes:

Break complete! Go easy on yourself. 💚

6. Mini Games

Create simple browser-based games that require no downloads.

Include at least:

Memory Game

Match cards.

Reaction Game

Click when the screen changes.

Rock Paper Scissors

Play against the computer.

Quick Tap Challenge

See how many times the user can tap within a time limit.

Track scores locally.

7. Brain Dump / Journal

Create a simple place where users can write whatever is on their mind.

Prompt:

"What's taking up space in your head?"

Features:

Text area

Save entry

Delete entry

View previous entries

Character count

Date/time

Do not make the interface feel like a serious diary. Keep it playful and lightweight.

8. Mood Journal

Allow users to record:

Mood

Short note

Date

Activity completed

Display previous entries in a timeline.

Example:

Today

😫 Frustrated
"Couldn't understand my assignment."

Activity:

🧘 Breathing — 2 min

9. Progress / Insights Dashboard

Create a dashboard showing:

Activities completed

Total relaxation time

Current streak

Favourite activity

Mood history

Weekly activity count

Use attractive charts and cards.

Example:

You've taken 42 minutes of intentional breaks this week. ⚡

The goal is NOT to make users obsessed with productivity.

The focus should be:

Healthy breaks > endless scrolling

10. About Page

Explain:

Why VibeReset exists

People spend hours studying or working without giving their brains proper breaks.

VibeReset provides quick, accessible activities to help people reset mentally.

Include:

Mission

How it works

Philosophy

Why intentional breaks matter

Contact section

11. Authentication

Implement authentication using Supabase.

Include:

Sign up

Login

Logout

Protected dashboard

User profile

Allow users to continue anonymously if they don't want to create an account.

Backend

Create a proper Node.js + Express backend.

Create REST APIs for:

Authentication

Register

Login

Logout

Get current user

Mood

Save mood

Get mood history

Activities

Get activities

Track completed activities

Get activity history

Journal

Create journal entry

Get journal entries

Update journal entry

Delete journal entry

Progress

Get user statistics

Get streak

Get total relaxation time

Get activity history

Use:

Proper HTTP status codes

Error handling

Input validation

Environment variables

Clean API structure

Supabase Database

Design a proper PostgreSQL database.

Suggested tables:

users

id

email

name

created_at

moods

id

user_id

mood

note

created_at

activities

id

title

category

description

duration

difficulty

created_at

activity_sessions

id

user_id

activity_id

duration

completed

created_at

journal_entries

id

user_id

content

created_at

updated_at

Create appropriate relationships and indexes.

Use Supabase Row Level Security where appropriate.

Zustand State Management

Use Zustand for global client-side state.

Create stores for things such as:

User Store

current user

login state

logout

Mood Store

selected mood

mood history

Activity Store

selected activity

current activity

activity history

UI Store

theme

active modal

timer state

Do not put every piece of state into Zustand. Use local React state when global state is unnecessary.

Navigation

Create a responsive navigation bar.

Desktop:

Logo | Home | Activities | Mood Check | Journal | Progress | Profile

Mobile:

Use a clean mobile navigation/bottom navigation.

Logo:

VibeReset ⚡

Responsive Design

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

Do not simply shrink desktop components.

Create proper responsive layouts.

Animations

Use animations carefully.

Examples:

Cards slightly move on hover

Buttons have subtle interactions

Mood selection has an animation

Breathing circle expands/contracts

Page transitions

Activity completion animation

Progress counters animate

Floating background shapes

Avoid excessive animations that make the application distracting.

UX Principles

The app should feel:

Fast

Simple

Non-judgmental

Fun

Relaxing

Accessible

Beginner-friendly

Avoid:

Too many popups

Complicated navigation

Excessive notifications

Productivity guilt

Dark psychological language

Overly clinical mental-health terminology

Important:

This application should be positioned as a wellness and relaxation tool, not as a replacement for professional medical or mental-health care.

Project Structure

Create a clean professional folder structure.

For example:

vibereset/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── stores/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   └── server.ts
│
└── README.md


You may modify the structure if there is a better architecture.

Code Quality Requirements

Write production-quality code but keep it understandable for a beginner.

Requirements:

TypeScript

Reusable components

Meaningful variable names

Comments where useful

No unnecessary duplication

Proper error handling

Loading states

Empty states

Error states

Form validation

Responsive UI

Accessible buttons and forms

Clean API architecture

Environment variables for secrets

Never expose Supabase secret keys or other credentials in frontend code.

Beginner-Friendly Development

Since I am learning Full-Stack Development, do NOT just dump the entire project without explanation.

For every major part:

Explain what we are building

Explain why we need it

Explain how it works

Show the folder/file structure

Give the code

Explain important parts of the code

Tell me where to put each file

Tell me how to run it

Tell me how to test it

Mention common beginner mistakes

Use simple language.

Assume that I know basic programming but am still learning full-stack development.

Development Order

Build the project step-by-step in this order:

Phase 1

Project setup

Phase 2

Frontend layout + design system

Phase 3

Landing page

Phase 4

Mood check-in

Phase 5

Activity dashboard

Phase 6

Breathing exercise

Phase 7

Relaxation timer

Phase 8

Mini games

Phase 9

Journal

Phase 10

Mood history

Phase 11

Authentication

Phase 12

Supabase database

Phase 13

Node.js + Express backend

Phase 14

Connect frontend + backend

Phase 15

Progress dashboard

Phase 16

Responsive design

Phase 17

Animations + polish

Phase 18

Testing + error handling

Phase 19

Deployment

Final Requirement

At the end, provide a complete summary containing:

1. What we built

2. Features

3. Frontend technologies

4. Backend technologies

5. Database structure

6. API endpoints

7. Folder structure

8. What I learned as a beginner

9. How the frontend communicates with the backend

10. How the backend communicates with Supabase

11. How authentication works

12. How to run the project locally

13. How to deploy it

14. Future features

Suggest future features such as:

AI-powered mood recommendations

Personalized activity recommendations

Spotify integration

More mini-games

Voice-guided breathing

Custom soundscapes

PWA/mobile installation

Social challenges

Smart break reminders

Most Important Instruction

Do not build this as a generic CRUD application.

The experience is the product.

When a user enters VibeReset feeling frustrated or mentally exhausted, the application should immediately make them feel:

"Okay... I can take a breath here."

Make the UI memorable, playful, funky, Gen-Z, and visually exciting while keeping the actual experience calming and easy to use.

Build it as a real full-stack portfolio-quality application, not just a demo.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vibe-reset-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/802b86f5-8007-4659-84ea-10114a486d9c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
