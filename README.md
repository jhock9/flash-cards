# Interactive Flash Cards App

The Interactive Flashcards App is an innovative tool designed to assist individuals, particularly those with autism and developmental disabilities, in enhancing their language and communication skills through engaging and interactive means. This digital adaptation of VB-MAPP flashcards transitions the utility and familiarity of traditional flashcards into a modern, digital format, providing a dynamic learning environment.

## Table of Contents
- [App Background](#app-background)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## App Background

### How It Works:
- **Visual Learning:** The app uses colorful and engaging images to represent objects, actions, emotions, and concepts. Each image is associated with a word or phrase.
- **Language Development:** Users interact with the flashcards to learn and practice words and phrases. This helps them understand and express themselves better.
- **Communication Practice:** The app encourages communication by allowing users to name what they see on the flashcards or express their needs and preferences.

### Why It's Helpful:
- **Boosts Communication:** Engaging with the flashcards simplifies discussing topics, posing questions, and expressing personal thoughts, enhancing conversational abilities.
- **Fun Learning:** The app integrates learning with play, transforming language development into an enjoyable and captivating experience.
- **Personalized Experience:** Therapists have the capability to tailor the flashcard content, ensuring it aligns with the individual needs and interests of each user, fostering a more personalized learning journey.

### Who Uses It:
- **Individuals:** Designed for anyone seeking to improve their language and communication skills, the app is especially beneficial for those with autism or developmental disabilities.
- **Therapists and Educators:** ABA professionals find this tool invaluable for incorporating into therapy sessions and educational activities, enriching the learning experience.

### Why It Matters:
The Interactive Flashcards App strives to make language learning and communication more accessible and enjoyable for those facing challenges in these areas. By digitizing these essential tools, we aim to support individuals in their language development endeavors, enhancing their ability to connect with the world around them and improving their overall quality of life.

## Features
- **Enhanced User Authentication:** Therapists can sign in or register through a secure internal system, allowing for the creation of detailed user profiles.
- **Client and Session Management:** Within the therapist dashboard, users can manage client profiles, organize sessions, and tailor therapy sessions to individual client needs.
- **Admin Exclusive Features:** Admin users can manage therapist accounts control image sourcing via AWS S3 integration.
- **Photo Tagging and Filtering:** Images can be filtered by tags (keywords), locked for session continuity, and saved for future sessions.
- **Dynamic Image Display:** Flashcards are presented in randomized order for variety, with support for tag-based filtering and photo locking.
- **Cron-Driven Photo Syncing:** New photos uploaded to S3 are automatically synced to MongoDB, preserving keywords and metadata.

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Local (Passport.js sessions)
- **Image Storage:** AWS S3 with EXIF keyword tagging
- **Deployment:** Render

## Recent Updates
Full migration from Google Photos to AWS S3 for image storage and management, including removal of Google OAuth integration, EXIF metadata extraction, and schema updates.

## Future Enhancements
- **Admin-Triggered Photo Sync:** Introduce a user interface button for admins to manually trigger photo synchronization with AWS S3.
- **Enhanced Tag Filtering:** Improve the visual tag filtering system for better usability and precision.
- **Profile Management Forms:** Develop and integrate forms for managing client and user profiles.
- **Drag-and-Drop Photo Upload:** Enable Admin users to upload photos and metadata directly to AWS S3 using a drag-and-drop interface.
- **Tag Editing Interface:** Develop an interface for Admin users to edit tags/descriptions in app.

## License
This project is proprietary and not open for public use or modification. All rights reserved.

## Contact
If you have any questions or want to discuss this project further, you can reach me at:

- Email: jon.hocker@gmail.com
- LinkedIn: [https://www.linkedin.com/in/jonhocker/](https://www.linkedin.com/in/jonhocker/)
- Website: [www.jonhocker.com](http://www.jonhocker.com)
