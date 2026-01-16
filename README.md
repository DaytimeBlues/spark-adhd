# Spark ADHD - React Native

React Native port of the Spark PWA for ADHD behavioral activation.

## Features

- **Ignite** - 5-minute focus timer with brown noise
- **Fog Cutter** - Break overwhelming tasks into micro-steps
- **Pomodoro** - Classic Pomodoro technique (25/5)
- **Anchor** - Breathing exercises (4-7-8, Box, Energize)
- **Check In** - Mood and energy tracking with recommendations
- **Brain Dump** - Quick capture for racing thoughts
- **Calendar** - Simple monthly view
- **Crisis Mode** - Safety resources and coping strategies

## Project Structure

```
spark-adhd-rn/
├── android/                    # Android Studio project
├── ios/                        # iOS project
├── src/
│   ├── components/            # Reusable UI components
│   ├── screens/               # App screens (12 total)
│   ├── services/              # API, storage, auth services
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Helper functions
│   ├── navigation/            # React Navigation setup
│   └── assets/                # Images, sounds, fonts
├── __tests__/                 # Unit tests
├── detox.config.js            # E2E test configuration
├── jest.config.js             # Unit test configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Android Studio
- JDK 17

### Installation

```bash
npm install
cd android && ./gradlew clean
```

### Running on Android Emulator

```bash
npm run android
```

### Running Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e:android

# Linting
npm run lint
```

### Building Release APK

```bash
npm run build:release
```

## Tech Stack

- React Native 0.74
- TypeScript
- React Navigation 6
- Jest + React Native Testing Library
- Detox for E2E testing
- AsyncStorage for persistence
- Google Sign-In for OAuth

## GitHub

- Repository: https://github.com/DaytimeBlues/spark-adhd (this repo)
- Original PWA version archived in git tags

## License

MIT
