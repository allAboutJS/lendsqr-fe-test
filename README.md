# Lendsqr Frontend Engineer Assessment

This repository contains a frontend application built as part of the Lendsqr frontend engineering test. The app is created with React, TypeScript, and SCSS, utilizing Vite as the build tool, and includes custom features such as a toast notification system and responsive design to enhance the user experience.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [License](#license)

## Overview

The application replicates a part of the Lendsqr admin console and includes the following pages as per the design requirements:
1. **Login**
2. **Dashboard**
3. **User List**
4. **User Details**

Each page has been designed with close attention to pixel-perfect accuracy according to the provided [Figma design](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend).

## Tech Stack

- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: React's built-in state tools
- **Data Storage**: IndexedDB for user details persistence
- **Mock API**: [Mocky.io](https://designer.mocky.io/) for simulating API data with 500 records

## Features

- **Responsive Design**: The app is fully responsive for mobile, tablet, and desktop views.
- **Custom Toast Notifications**: A lightweight, custom notification system for enhanced user feedback.
- **Data Persistence**: User details are stored locally to support offline access on the User Details page.
- **TypeScript Support**: Strong type-checking ensures code reliability and maintainability.
- **Testing**: Includes unit tests for components featuring both positive and negative scenarios.

## Getting Started

### Prerequisites

- **Node.js** (>=16.x)
- **Vite** for bundling

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/allaboutjs/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   yarn run dev
   ```

4. To build the project for production:
   ```bash
   yarn run build
   ```

## Usage

The application supports the following flows:
- **Login**: Secure access through a login form.
- **Dashboard**: Overview of key data points with visual fidelity matching the Figma design.
- **User List**: Dynamic table view of users fetched from the mock API.
- **User Details**: Detailed view with IndexedDB persistence for offline accessibility.

## Testing

Unit tests have been written for major components and flows. To run tests:
```bash
yarn run test
```

The testing approach includes both positive and negative scenarios to ensure robustness.

## Folder Structure

```plaintext
src
├── assets          # Static assets (images, icons, fonts e.t.c.)
├── components      # Reusable components
├── pages           # Individual pages (Login, Dashboard, User List, User Details)
├── styles          # Global and component-specific SCSS files
├── utils           # Utility functions (e.g., custom notification logic)
└── App.tsx         # Main app component plus router
```
