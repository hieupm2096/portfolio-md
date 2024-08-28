---
id: c7dd0c08-610e-4f25-841c-190daca107fb
title: 'Design Pattern: Chain of Responsibility'
created_time: 2024-06-16T17:47:00.000Z
last_edited_time: 2024-08-28T20:00:00.000Z
draft: false
featured: false
sync: ready
slug: design-pattern-chain-of-responsibility
tags:
  - design pattern
  - behavioral pattern

---

## Intent

Chain of responsibility is a behavioral pattern that let you pass request along a chain of handlers. When receiving request, each handler decides to either process the request or pass it to the next handler in the chain.

## Example

In practical, I observe the use of CoR in Dio Interceptor. Dio is a powerful HTTP client wrapper used in Dart. Dio uses interceptors to intercept requests, responses and errors before they are handled.

We can set multiple interceptors to Dio, eg. *LogInterceptor, AuthInterceptor, etc.*

The request will be passed along those interceptors and handled by their handlers. For example, the *AuthInterceptor* will decide to attach the access token into request (need authorization or not), validate the access token, decide to pass the request to the next handler or not based on the validation, etc. Then, we pass the request to the *LogInterceptor* to log the request by printing it on the console for debugging or writing it into a file.

There are several advantages of applying CoR, like many other behavioral patterns, we separate particular behaviors into stand-alone objects called handlers (encapsulate what varies):

*   Open/Closed principle: Dio client is open to add new handler without breaking the existing interceptors or its own implementation.

*   Single responsibility principle: every interceptor does their own work, make them separate and decouple, which means you could take one out (such as not using LogInterceptor in production) without breaking Dio client or other interceptors.
