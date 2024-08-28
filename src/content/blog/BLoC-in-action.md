---
id: 5e163c1c-3690-4578-89b8-9ce1791ab112
title: BLoC in action
created_time: 2024-06-23T04:24:00.000Z
last_edited_time: 2024-08-28T20:00:00.000Z
draft: false
featured: false
sync: ready
slug: bloc-in-action
tags:
  - flutter
_thumbnail: src/assets/images/Untitled_qpYrZEo9.png

---

# BLoC - Business Logic Component

## Overview

The concept behind bloc is pretty simple with 3 parts:

*   `Event`

*   `BLoC`

*   `State`

You use `Event` to trigger `Bloc` and it is passed into `Bloc` from the UI layer. For each `Event`, `Bloc` has its event handler to handle that event and emit states while handling the event. After emitting new state, it is reflected on the UI layer by UI listeners which listen to Bloc state.

The data flow in Bloc is unidirectional, which means you can only emit new state inside the scope of bloc, nowhere else. The states in bloc are also immutable so to notify that there are changes in the state, you must emit a new instance of object instead of just modifying the old one.

![](src/assets/images/Untitled_qpYrZEo9.png)

## Create a bloc

Let’s take an example of Bloc:

```dart
// list_post_event.dart
// sealed modifier is used to make sure you can only extend ListPostEvent
// in list_post_event.dart file scope.
sealed class ListPostEvent {
	const ListPostEvent();
}

// final modifier is used to make sure ListPostFetched cannot be extended.
final class ListPostFetched extends ListPostEvent {
	const ListPostFetched();
}
```

```dart
// list_post_state.dart
sealed class ListPostState {
	const ListPostState();
}

// the initial state for [ListPostBloc]
final class ListPostInitial extends ListPostState {
	const ListPostInitial();
}

// the loading state while fetching list posts
final class ListPostFetchedInProgress extends ListPostState {
	const ListPostFetchedInProgress();
}

// the success state after fetching list posts succes
final class ListPostFetchedSuccess extends ListPostState {
	final List<Post> posts;
	
	ListPostFetchedSuccess(this.posts);
}

// the failure state after fetching list posts fail
final class ListPostFetchedFailure extends ListPostState {
	final String message;
	
	ListPostFetchedFailure(this.message);
}
```

```dart
// list_post_bloc.dart
final class ListPostBloc extends Bloc<ListPostEvent, ListPostState> {
	final GetPostUseCase _getPost;

	ListPostBloc({required GetPostUseCase getPostUseCase}) 
		: _getPost = getPostUseCase, 
			super(const ListPostInitial()) {
			
		// registered handler to handle [ListPostFetched] event
		on<ListPostFetched>((
			ListPostFetched event,
			Emitter<ListPostState> emit,
		) async {
			// event handler has access to emitter to emit new state and event 
			// to access event property
			// emit loading state
			emit(const ListPostFetchedInProgress());
			
			final result = await _getPost.execute();
			
			// here I used Result<Success, Failure> to delegate exception handling
			// into repository
			result.when(
				success: (List<Post> posts) => emit(ListPostFetchedSuccess(posts)),
				failure: (failure) => emit(ListPostFetchedFailure(failure.toString())),
			);
		});
	}
}
```

As you can see in the above example, to create a bloc, you need:

*   Create events for bloc

*   Create states for bloc

*   Create bloc: register event handler for event, execute business logic,  emit appropriate states.

## Advanced Bloc features

### Observing a Bloc

In every `bloc`, you could override some helper functions to enhance its productivity:

*   `onEvent(SomeEventClass event)`: listen to all the event of bloc, I often use that to log some important events of bloc.

*   `onTransition(Transition<SomeEventClass, SomeStateClass> transition)`: listen to all transition of bloc, the transition contains current state, the event and the next state.

*   `onChange(Change<SomeStateClass> change)`: listen to all changes of bloc, change has access to the old state and the current state of bloc.

*   `onError(error, stackTrace)`: listen to all uncaught exceptions occur inside bloc, notice that it is not recommended to handle error and emit new state inside this handler, the emitter should be used inside the event handler only.

Beside that, you could observe to all `bloc` changes in one place by utilizing `BlocObserver` :

```dart
// simple_bloc_observer.dart
class SimpleBlocObserver extends BlocObserver {
  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    print('${bloc.runtimeType} $change');
  }
}
```

⇒ If you need to observe bloc changes in one `bloc` only, let override that bloc methods

⇒ If you need to observe bloc changes in all `bloc`, implement your own observer by extending `BlocObserver`

### Transform Bloc event

`Bloc` also provides an `EventTransformer` to change the way incoming events are processed by the bloc, for example:

```dart
EventTransformer<T> debounce<T>(Duration duration) {
	return (events, mapper) => events.debounceTime(duration).flatMap(mapper);
}

SearchPostBloc() : super(const SearchPostInitial()) {
	on<PostSearched>(
		(event, emit) {
			emit(const PostSearchedInProgress());
			
			final params = event.text;
			
			// search for post using above params, call the backend api
			...
		},
		transformer: debounce(const Duration(milliseconds: 300))),
	);
}
```

In the above example, we trigger searching by typing into the search text field, instead of calling handler every character we typed, we debounce the `PostSearched` event to trigger only after 300ms of debouncing.

## Bloc-to-Bloc Communication

To comply with *Clean Architecture*, sibling dependencies between two entities in the same architectural layer should be avoided at all cost, which means a Bloc shouldn’t be dependent on another Bloc.

Let’s take an example for coupling Blocs:

```dart
class TightlyCoupledBloc extends Bloc {
	final OtherBloc otherBloc;
	
	TightlyCoupledBloc(this.otherBloc) {
		on<SomeEventClass>((event, emit) {
			...
			
			// extract the state from other bloc
			final someVar = otherBloc.state;
			
			// do sth
			...
		});
	}
	
	@override
	Future<void> close() {
		// if you want to close otherBloc, do it in here
		otherBloc.close();
		return super.close();
	}
}
```

No bloc should know about any other bloc.

If you’re in a situation where a bloc needs to communicate with another bloc, you can push the state up a layer (into the presentation layer) or down a layer (into the domain layer).

### Connecting Blocs through Presentation

```dart
class MyWidget extends StatelessWidget {
  const MyWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocListener<FirstBloc, FirstState>(
      listener: (context, state) {
        // When the first bloc's state changes, this will be called.
        //
        // Now we can add an event to the second bloc without it having
        // to know about the first bloc.
        context.read<SecondBloc>().add(SecondEvent());
      },
      child: TextButton(
        child: const Text('Hello'),
        onPressed: () {
          context.read<FirstBloc>().add(FirstEvent());
        },
      ),
    );
  }
}
```
