---
id: 62bfeaee-c28e-41f5-aff2-d26d1d4c20c1
title: RehaSpace - Relyon IT Services, rits.center
created_time: 2024-08-27T06:21:00.000Z
last_edited_time: 2024-08-28T20:00:00.000Z
icon_emoji: 💼
draft: false
description: >-
  RITS is a worldwide company providing high-quality, streamlined services in
  the modern technology sector to support businesses in USA, Vietnam and Poland.
  At RITS, I'm responsible for developing cross-platform mobile applications in
  healthcare domain using Flutter technology.
featured: true
sync: ready
slug: rehaspace-relyon-it-services-rits-center
tags:
  - flutter
  - work
_thumbnail: src/assets/images/rehaspace_9e092af00a_dCDEgHVG.png

---

## RITS Vietnam

RITS is a worldwide company providing high-quality, streamlined services in the modern technology sector to support businesses in USA, Vietnam and Poland. At RITS Vietnam, I'm responsible for developing cross-platform mobile applications in healthcare domain using [Flutter](https://flutter.dev/) technology.

Most of our projects are small size with 10 to 12 developers, finish in 3 to 6 months and come with both web and mobile app. I was the sole mobile developer responsible for all mobile-related solutions. To give an example of what I've done here, let me introduce **RehaSpace**.

### Overview

**RehaSpace** is one of mobile applications that I worked on, designed to assist patients' rehabilitation process. Some key features of the app:

### **Profile**

*   Patient profiles: manage their personal information, medical history and therapists' advise.

*   Therapist profiles: manage their personal information, working hours and consultation rate.

### **Conduct therapy session**

Therapy session is a video meeting on the app between patient and therapist. Patients can schedule appointments with their therapist with real-time availability. To improve appointment adherence, the app also sends reminder notification for both therapist and patient. For therapists, they could manage their appointments and re-arrange the appointment time in case of emergency issues.

### **Rehabilitation plans**

Therapists can create their own rehabilitation plans and assigned them for their patients. For patients, they can watch their assigned plan, follow its instructions and mark the progress automatically,

UIs of the app:

![](src/assets/images/rehaspace_9e092af00a_dCDEgHVG.png)

### Technology used

*   [**Flutter**](https://flutter.dev/): The app is built using Flutter for cross-platform compatibility (iOS and Android).

*   [**GoRouter**](https://pub.dev/packages/go_router): Convenient routing package for Flutter that is able to route using a URL, handle deep link, etc.

*   [**Riverpod**](https://pub.dev/packages/riverpod): For dependency injection, state management, reactive data caching.

*   **Firebase**: Firebase Cloud Messaging for notification.

*   [**Branch SDK**](https://branch.io/): For accessing app using deep link (confirm user's account, confirm reset password, etc).

*   [**AgoraRTC**](https://agora.io/): To implement video meeting feature.

*   [**chewie**](https://pub.dev/packages/chewie) and [**video\_player**](https://pub.dev/packages/video_player): To implement video player feature.
    *Appointment feature example*

    ![](src/assets/images/appointment_feature_example_64c4448436_dN4UeTIZ.png)

### Challenges overcome

*   I haven't worked with video meeting/video call and Agora SDK before so it was a bit troublesome at first, but after some try and fail attempts, the feature worked great. First, create an app on Agora to retrieve app ID and secret token. After that, you need to request Agora endpoint to create the meeting token, we wrap that request inside our backend to secure the secret token between us and Agora. Retrieving the meeting token and the meeting ID, we pass it into [AgoraRTC Engine](https://pub.dev/packages/agora_rtc_engine), do some configurations on that instance and join the meeting, don't forget to request permissions for camera and microphone. Agora Engine provides us some useful event handlers to handle when users join the channel, leave the channel, offline and so on, all we need to implement those functions accordingly to requirements. Simple enough after we came up with the AgoraSDK and backend solution.

*   The video player feature is supposed to be easy but not with Flutter. In Flutter, you need [video\_player](https://pub.dev/packages/video_player) to play the media and [chewie](https://pub.dev/packages/chewie) for player controls (of course we could create our own controls using Flutter widget, but it takes more effort and chewie is good enough for me). Multiple libraries for a simple feature maybe too much, but I understand to make things compatible, you need to go around a bit. This one is one of Flutter's disadvantages comparing to native.

*   I have a chance to work with Web Socket, it was not challenging, it was fun :D.

To sum up, I gained valuable experience while working on this project and I am grateful for the opportunity. Thank you for your attention.
