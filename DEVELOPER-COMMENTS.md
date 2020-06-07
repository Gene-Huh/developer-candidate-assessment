# Gene Huh's TE Developer Coding Assessment Comments

## The Requirements

### Exercises View
1. View displays Average Overall Score
2. View displays list of Exercises.
2. Exercise Average Scores displayed on the right side
3. Clicking on Exercise leads to individual Exercise view

### Exercise View
1. Name of Exercise displayed 
2. View displays list of students
3. Student's score displayed on right side
4. Ability to update Student's score
5. Update all averages without Save or Submit

Bonus:
1. Student's profile picture is displayed
2. Exercise Overall Average displayed on right side

## Breakdown of Structure

1. Components ExercisesList (provided) and ExerciseView for UI
2. Install and use VueX for structuring single source of info

## Approach Plan

1. Recreate working version that passes initial tests with VueX in place.
2. Create vuex module combining all the API services needed for this project.
3. Enable exercise average functionality and overal average display for initial page.
4. Create individual exercise router view target and nested view page.
5. Flush out vuex module.
6. Enable exercise to display students, avatars, and scores.
7. Filter null values for display.
8. Now that the views are reproduced, enable functionality for browser refresh.
9. Enable click on editing of scores and updates to vuex store.
10. Create JSON update functionality
11. Format/CSS views

### Additional Thoughts

If I have the time to learn how to write tests, I will learn how to write them and start with unit tests. Basic unit tests should just check the API to see if it is populating the store state arrays and/or updating.

John Fulton's first rule of programming: Does it pass as MVP?

I think it would be better to clean up the code before creating tests due to time constraints.