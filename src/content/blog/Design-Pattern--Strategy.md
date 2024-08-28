---
id: 6c20eb15-92f4-44b9-829f-b6e5cea049d8
title: 'Design Pattern: Strategy'
created_time: 2024-06-16T12:29:00.000Z
last_edited_time: 2024-08-28T20:00:00.000Z
draft: false
featured: false
sync: ready
slug: design-pattern-strategy
tags:
  - design pattern
  - behavioral pattern

---

## Intent

**Strategy** is a behavioral design pattern that lets you define a family of algorithms, separate it into class called *strategies*.

The original class, called *context*, must store a reference to one of strategies in a field or more. Context delegates the work to a linked strategy object instead of executing it on its own.

This way, the context becomes independent of concrete strategies so you can add new algorithms or modify strategies without changing the code of context or other strategies.

## Example

One real world example of strategy pattern is going to work.

To go to work, you could walk, Uber or driving. Every method of going to work considers to be a strategy.

Every strategy has its own dependencies, for example, to drive, you need a functional car; to catch a Uber, you need your phone and money; etc. To go to work, you choose a strategy that fits you best at that moment, execute that strategy and don’t care about other ones.

One day, you figure out that you could go to work by bus, all you need to do is implement that GoToWorkStrategy with concrete implementation of bus.

In practical, I implement authentication feature in my application using Strategy design pattern.

I have different methods for user to authenticate: auth with password, auth with facebook, auth with google. Later on, I could have to implement sign in with apple or any new kinds of sign in with providers, etc.

We could implement an AuthenticateService with different methods for different authentication providers, something like:

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

There are many problems with above approach:

*   Testability: to test the service, you need to provide multiple dependencies, it’s doable but unnecessary, it would be best if we could test authenticate with facebook with only mock facebook client (isolation).

*   Maintainability: if we need to add a new authentication method, like authenticate with Apple, we need to modify AuthenticationService class, add new dependency (AppleClient) which leads to changes at AuthenticationService initialization. Arguably, you could use Singleton to minimize effects, but it still goes against the Open/Close principle (SOLID), drastically reducing extensibility. With more and more authentication methods added, AuthenticationService would become enormous and hard to maintain.

Here comes Strategy pattern to rescue

```dart
// Context maintains a reference to one of concrete strategy
// and communicate with this object via strategy interface

class AuthenticationContext {
	AuthenticationStrategy strategy;
	
	AuthenticationContext(this.strategy);
	
	Future<AuthResult> authenticate() {
		return strategy.authenticate();
	}
}
```

```dart
abstract class interface AuthenticationStrategy {
	Future<AuthResult> authenticate();
	
	Future<SignOutResult> signOut();
}
```

```dart
class PasswordAuthenticationStrategy implements AuthenticationStrategy {
	final IYourClient client;
	final String username;
	final String password;
	
	const PasswordAuthenticationStrategy(
		this.client,
		this.username,
		this.password,
	);
	
	@override
	Future<AuthResult> authenticate() async {
		// ...
		final res = await client.authenticate(username, password);
		// ...
	}
}
```

```dart
class FacebookAuthenticationStrategy implements AuthenticationStrategy {
	final FacebookClient client;
	
	const FacebookAuthenticationStrategy(this.client);
	
	@override
	Future<AuthResult> authenticate() async {
		// ...
		final res = await client.signIn();
		// ...
	}
}
```

```dart
Button(
	"Login with Password",
	onTap: () {
	  // normally, I would execute this those codes in riverpod async notifier
		authContext.stategy = PasswordAuthenticationStategy(
			ioc.getIYourClient(),
			username,
			password,
		);
		
		authContext.authenticate();
	}
),

Button(
	"Login with Facebook",
	onTap: () {
		authContext.stategy = PasswordAuthenticationStategy(
			ioc.getIFacebookClient(),
		);
		
		authContext.authenticate();
	}
),
```

There are some advantages with this approach:

*   Testability: we isolate every authentication strategy on its own, so it could be tested easily in isolation: create a mock client, arrange the result of mock client method, verify method call and assert the result of authenticate method.

*   Open/Closed principle: the feature is open to extension (adding new authentication method) and closed to modification (changing the existing authentication method).

*   Loose coupling: it’s easier to add new authentication methods without modifying existing code.

## Conclusion

**Strategy** design pattern is a behavioral pattern that helps us to encapsulate methods which vary a lot  into class called *strategy*, allow the context class to use different strategies depends on business logic (interchangeable), embracing open/closed principles, composition over inheritance and programming to interface not implementations.
