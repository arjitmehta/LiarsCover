#!/bin/bash

echo "📦 Installing navigation packages..."
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons

echo "📦 Installing file system and document picker..."
npm install react-native-fs react-native-file-access

echo "📦 Installing CSV parser..."
npm install papaparse

echo "📦 Installing sound library..."
npm install react-native-sound

echo "📦 Installing Tailwind (NativeWind)..."
npm install nativewind react-native-svg

echo "🔗 Linking native dependencies..."
npx react-native link react-native-sound
npx react-native link react-native-fs
npx react-native link react-native-document-picker

echo "✅ All packages installed!"
echo "⚠️  Remember to add 'react-native-reanimated/plugin' to babel.config.js"
