Project Requirements Document: Quintessence Games Homepage

Overview

Create a one-page interactive marketing website for Quintessence Games, a horror-inspired, emotion-driven game development studio. The design must reflect atmospheric storytelling, emotional depth, and immersive transitions.

This will be implemented using React, and must be component-based, scalable, and animation-capable.

Key Requirements

Layout

Single-page scrollable layout with distinct thematic sections.

All navigation interactions must scroll to target sections (no hard page reloads).

Left-aligned vertical navigation bar.

Navigation Bar

Position: Fixed to the left of the screen.

Background: Matches site background.

Logo: Vertically centered; scrolls to top when clicked.

Bottom Section Includes:

Sound On/Off toggle

Nav links: About, Genesis, Values, Team, Jobs, Contact

Apply Now button (scrolls to Job Listings section)

Section Specifications

1. Landing Interaction (Hero)

Background: Deep black texture

Centered text: "Enter a world where emotions take shape."

CTA Button: Reawaken Yourself

On click:

Text and button flicker and disappear

All letters of “Quintessence Games” flicker in simultaneously, scattered randomly across screen

On scroll:

Two visual elements slide/fade from sides

Letters align into proper title placement

2. "Games for the Soul" Section

Subtitle: What Drives Us

Background: Full-bleed with ambient fog/motion

Right-side paragraph block (slow-fade entrance)

3. "Genesis" Section

Subtitle: Where It Began

Layout: Split screen

Left: Image of Corpus Christi apartment

Right: Paragraph about founding/team

Transition effect: Faint old-TV static or VHS wipe

4. "Our Values" Section

Single paragraph text block (right-aligned)

Background color: warm reddish tone

5. "Join the Team" Section

Lists open roles by department (Art, Engineering, etc.)

Each job displays:

Job title (left)

Location (right)

Horizontal divider below each role

Bottom of section has CTA: Interested? Apply Now

Also accessible in nav bar

Scrolls to this section from all areas

6. Application Form

Fields:

First Name

Last Name

Email

Phone Number

Job Role (free text)

Portfolio URL

Resume Upload

Checkbox for Terms & Conditions

Submit Button (unstyled default button)

7. Concept Art Preview

Grid layout

Clicking a thumbnail opens modal:

Enlarged image centered in viewport

Dismiss by background click or close (X) button

8. Meet the Team

Grid of cards:

Image at top

Role as heading

Name within paragraph

Paragraph begins with name (e.g., "Ava is a senior narrative designer...")

9. Contact Section

Dark background

Single text input form (e.g., message)

Submit button (unstyled)

10. Footer

One-line footer containing:

Privacy · Terms and Conditions · © 2025 Quintessence Games LLC

Style Guide

Fonts

Titles: Cormorant Garamond, Spectral SC, or similar serif

Body: Inter, Space Grotesk, or DM Sans

Colors

Backgrounds: #0D0D0D, #1A1A1A, #222

Accents: #C2B280 (old gold)

Text: Pure white (#FFFFFF)

Motion

All transitions and animations should be:

Smooth, slow-paced

Favor dissolve, fade, phase-in/out rather than abrupt animations

Special Interactions

Cursor

Fragment Cursor: Cursor is broken into 3–4 shards that float slightly apart and reassemble on hover

Sound Design (Optional Implementation)

Looping ambient soundscape

Subtle sound effects for button clicks, flickers, or transitions

Controlled via On/Off toggle in nav bar

Easter Eggs (Optional)

Hidden interactions such as Konami code trigger for bonus content or visual glitch

Technical Notes

Project must be modular and component-driven

Prefer use of animation libraries for transitions (e.g., Framer Motion, GSAP)

Ensure accessibility (focus styles, keyboard nav, semantic HTML)

Responsive design not required for first pass but structure should not block future implementation

