# Team Page & Login Styling Requirements

## Purpose
This document defines the requirements for the Team page, the visual restyling of the Login page, and relevant edge cases.

## 1. Team Page Requirements

### Name
- Required.
- Display each team member's full name clearly.

### Photo
- Display a profile photo for each team member.
- If a photo is unavailable or fails to load, display a default placeholder.

### Role
- Required.
- Clearly display each team member's project role.

### Blurb
- Display a short description for each team member.
- Text must wrap and remain within the layout.

### Responsive Display
- Team member content must remain readable on desktop and mobile layouts.
- Use a consistent layout for all team members.

## 2. Login Restyling Scope

*Important: The Login task is styling-only.*

- Visual changes may include layout, spacing, colours, typography, buttons and input styling.
- Include a password visibility control to show or hide the entered password.
- Display a Login/Sign In option for users who are not authenticated.
- Display a Logout option for authenticated users.
- Existing authentication functionality must remain unchanged.
- Do not change Firebase authentication, login logic, session handling or existing login behaviour.

## 3. Edge Cases

### Missing Profile Photo
- Display a default placeholder image.

### Long Name or Role
- Text should wrap without overlapping other elements.

### Long Blurb
- Text should wrap and remain within the team member layout.

### Large Number of Team Members
- The layout should accommodate additional team members without requiring redesign.

### Smaller Screens
- Team and Login pages should remain readable and usable on smaller screens.

## 4. Acceptance Criteria
- Each team member displays a name, role, photo/placeholder and blurb.
- Missing or long content does not break the Team page layout.
- Login page visual styling follows the agreed UX design.
- Password visibility control allows the entered password to be shown or hidden.
- Login/Sign In and Logout options are displayed in the appropriate user states.
- Existing login/authentication functionality continues to work unchanged after restyling.
- Both pages remain usable on common desktop and mobile screen sizes.