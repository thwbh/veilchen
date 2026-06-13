# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Snackbar Component: Transient notification with optional action button

## [0.3.1] - 2026-06-04

### Added

- ActivityRing component
- SearchBar component
- Floating action button component
- Customization options to LoadingSpinner
- Variant property ('box' | 'callout') to AlertBox
- Card component with styling props for Stack and StackCard
- Toast component with cleanup for AppShell and BottomNavigation
- AppShell component with pull-to-request handle
- Breadcrumbs, Menu, and NavBar components
- Avatar component with DiceBear support
- PullToRefresh component
- SwipeableListItem component
- LongPressContainer and LoadingIndicator
- NumberStepper, NumberWheel, and InlineNumberWheel components

### Changed

- Hardened release process
- Upgraded dependencies
- Resolved Svelte 5 compiler errors
- Updated favicon and logo
- Improved ButtonGroup mobile touch targets
- Finetuned NumberStepper and InlineNumberWheel components
- Fixed AppShell nested PullToRefresh inlay
- Calculated free space in AppShell based on bottom dock height
- Provided button click event in ModalDialog confirm and cancel methods
- Animated Stepper component
- Fixed AppShell layout issue where too much space was reserved
- Moved badge classes to enum to avoid JIT compiler stripping

### Fixed

- ModalDialog callbacks to allow returning false to keep dialog open
- NumberStepper min/max clamp bypass on manual input
- NumberWheel out of bounds area receiving touch events
- NumberWheel index bounds validation for robustness
- InlineNumberWheel not snapping to default value
- PullToRefresh handle running in modal windows
- Stepper indicator line being sticky
- Avatar placeholder not being centered inside flex containers
- npm nagging issues
- Added missing ResizeObserver and element.animate mocks
