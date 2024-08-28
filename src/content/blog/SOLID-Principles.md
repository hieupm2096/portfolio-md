---
id: 09599d6c-2809-4935-809f-0798178d4573
title: SOLID Principles
created_time: 2024-06-17T10:23:00.000Z
last_edited_time: 2024-08-28T20:30:00.000Z
draft: false
description: SOLID
featured: false
sync: ready
slug: solid-principles
tags:
  - fundamental

---

# SOLID Principles

## Introduction

*SOLID* are five OO principles for software development that could be considered good practices to follow to ensure the extensibility and maintainability of codes.

*   **S** - Single Responsibility

*   **O** - Open/Closed principle

*   **L** - Liskhov substitution

*   **I** - Interface segregation

*   **D** - Dependency inversion

We will go through those principles one by one

## S - Single responsibility principle

This principle states that a class should have only one reason to change, which means it should have only one job.

Let takes an example from my article [Design Pattern: Strategy](https://www.notion.so/6c20eb1592f444b9829fb6e5cea049d8), the *AuthenticationService* class.

```dart
class AuthenticationService {
	FacebookClient facebookClient;
	GoogleClient googleClient;
	YourClient yourClient;

	Future<AuthResult> authWithFacebook() async {
		// concrete implementation
	}
	
	Future<AuthResult> authWithGoogle() async {
		// concrete implementation
	}
	
	Future<AuthResult> authWithPassword(String username, String password) async {
		// pass in username and password arguments
	}
}
```

The *AuthenticationService* class contains the authenticate method of all the providers you use. Arguably, one could say it has only one responsibility (to authenticate). But, for example when you want to change one of those provider clients, other authentication methods have nothing to do with those changes, but you still need to modify the *AuthenticationService* class which potentially impact unrelated parts of the code.

One way to satisfy Single responsibility principle here is to delegate authentication execution to other classes called strategies, maintain the reference to strategy object in a context class and execute the authentication via context class only, please read more about it here [Design Pattern: Strategy](https://www.notion.so/6c20eb1592f444b9829fb6e5cea049d8).

In conclusion, Single responsibility principle makes sure that our codes have the best separation, loosely coupling, interchangeable → easy to test and maintain.

## O - Open/Closed principle

This principle states that object or entity should be *open for extension* and *closed for modification*, which means a class should be extendable without modifying the class itself.

Let take the above example [Design Pattern: Strategy](https://www.notion.so/6c20eb1592f444b9829fb6e5cea049d8), with strategy pattern, the *AuthenticationService* (now turn to be *AuthenticationContext*) can be used to execute authenticating on various providers and to introduce and authenticate a new provider, we just need to create a new strategy and don’t need to modify the *AuthenticationContext* class.

In conclusion, Open/Closed principle makes sure that it’s easy to add a new feature without modifying existing codes.

## L - Liskhov substitution principle

This principle states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.

Let take the example of Authentication once again, every authentication strategy is a subclass of *AuthenticationStrategy* interface, those strategies are interchangeable and still produce a valid result if you replace one with another.

This principle makes sure of two things:

*   The subclass should fulfill the contract of its interface.

*   The implementation of subclass should be unified and does not cause unintended behavior.

## I - Interface segregation principle

This principle states that a subclass should not be forced to depend on methods it doesn’t use.

For example, we have an interface called *DuckBehavior* has two functions *fly()* and *quack().* We create two classes to implement the interface called *MallardDuck* and *RubberDuck*. The problem here is rubber duck couldn’t fly, but since it implements *DuckBehavior*, it needs to implement the *fly()* method no matter what. So the design of DuckBehavior violates the interface segregation principle.

By following ISP, we reduce code complexity and coupling by using smallest piece of interface.

## D - Dependency inversion principle

This principle states that high-level module should not depend on the low-level module, but they should depend on abstraction.

Let’s take the [Design Pattern: Strategy](https://www.notion.so/6c20eb1592f444b9829fb6e5cea049d8) example

```dart
// Context maintains a reference to one of strategy
// and communicate with this object via strategy interface

class AuthenticationContext {
	AuthenticationStrategy strategy;
	
	AuthenticationContext(this.strategy);
	
	Future<AuthResult> authenticate() {
		return strategy.authenticate();
	}
}
```

*AuthenticationContext* is a high-level module and it communicates with different strategies using the *AuthenticationStrategy* interface, instead of a concrete implementation (eg. *FacebookAuthenticationStrategy*). As you can see, both *AuthenticationContext* and *FacebookAuthenticationStrategy* depend on the abstraction *AuthenticationInterface*. By doing so, the context is decoupled from strategy and extendable, the strategy is decoupled from context and reusable.

In conclusion, SOLID principles are OO principles that ensure your program to be testable, maintainable and scalable.
