# Complaint App Offline

## Features : 
  * **Show List Complaints ( last 90 days )**
    * list complaint (online)
    * list complaint (offline)
    * sync data
    * show how many pending edit / add complaint
  * **Input complaint**
    * autocomplete choose customer
    * input complaint (online)
    * input complaint (offline)
  * **Edit Complaint**
    * autocomplete choose customer
    * input complaint (online)
    * input complaint (offline)

## React Native Offline Architecture
<iframe src="https://drive.google.com/file/d/1r4jD_f9fQ4Fe-pgAfEZEsjmWRpYgeL3M/preview" width="640" height="480"></iframe>

## Tech Stack
  * **React Native**
    * `React Native`
      - See the docs for [Getting Started](https://facebook.github.io/react-native/docs/getting-started)
    * `React Navigation`
      - See the docs for [Getting Started](https://reactnavigation.org/docs/en/hello-react-navigation.html)
  * **State Management**
    * `Redux`
      - See Redux implementation at [this code]() 
      - For more info you can check the [Official Docs Redux](https://redux.js.org/introduction/getting-started) 
  * **Middleware**
    * `Redux Saga`
      - See Redux Saga implementation at [this code]()
      - Reason why use **Redux Saga** not **Redux Thunk**
        > The benefit to Redux-Saga in comparison to Redux-Thunk is that you can avoid callback hell meaning that you can avoid passing in functions and calling them inside. Additionally, you can more easily test your asynchronous data flow. The call and put methods return JavaScript objects. Thus, you can simply test each value yielded by your saga function with an equality comparison. On the other hand, Redux-Thunk returns promises, which are more difficult to test. Testing thunks often requires complex mocking of the fetch api, axios requests, or other functions. With Redux-Saga, you do not need to mock functions wrapped with effects. This makes tests clean, readable and easier to write.
      - For more info you can check the [Official Docs Redux Saga](https://redux-saga.js.org/) 
    * `React Native Offline`
      - See React Native Offline implementation at [this code]()
      - Basic comparison why we choose **React Native Offline**
        > **Comparison between rn offline and redux offline**
        **RN Offline**
        easy setup for redux-saga
        have utilities such as check internet connection, reduce data
        have offline queue
        **Redux Offline**
        Mature Library
        A lot people use it ( have a more start and fork in github )
      - For more info you can check the [Official Docs React Native Offline](https://github.com/rgommezz/react-native-offline)
    * `Redux Persist`
      - See Redux Persist implementation at [this code]()
      - For more info you can check the [Official Docs Redux Persist](https://github.com/rt2zz/redux-persist)
    * `Redux Logger`
      - See Redux Logger implementation at [this code]()
  * **UI Kit**
    * `Native Base`
      - Cheat Sheet [Components Native Base](https://docs.nativebase.io/docs/CheatSheet.html)

## Instructions

### To run the app locally

1. Make sure you have `node` and `npm` installed, if not refer to below.
    - Mac users: https://changelog.com/posts/install-node-js-with-homebrew-on-os-x
    - Windows users: http://blog.teamtreehouse.com/install-node-js-npm-windows
    
2. Make sure you have `react-native packages` installed, if you not refer to below.
    - Mac, Windows, Linux users : https://facebook.github.io/react-native/docs/getting-started

3. Alternatively, use [yarn](https://yarnpkg.com/en/) for faster dependency installation
    and more stable dependency management. You can use `yarn` in the place of `npm`.
    ```
    $ yarn install
    ```
    instead of
    ```
    $ npm install
    ```
    - Instructions for installation: https://yarnpkg.com/lang/en/docs/install/
    
4. Clone the repository.
    - Using SSH (recommended):
    ```
    $ git clone git@bitbucket.org:efishery/fo-tools-activity.git
    ```
    - Using HTTPS:
    ```
    $ git clone https://hryer99@bitbucket.org/efishery/fo-tools-activity.git
    ```
    
5. Move into the cloned directory.
    ```
    $ cd fo-tools-activity
    ```

6. Install dependencies.
    ```
    $ npm/yarn install
    ```
    
7. Run the app locally in a _development_ mode.
    - Run on _android_
    ```
    $ react-native run-android
    ```
      - The development mode comes with a "Remote JS Debugging, Hot Reload, and Live Reload" functionality for debugging. If you use android studio emulator on MacOs to access this functionality you can use ``` command + shift + m ``` or shake your phone until the pop up comes up and you can enable all this stuff.

    - Run on _iOS_
    ```
     $ react-native run-ios
    ```

## How the thing's works or how to configure it
For the `config` stuff you can check the docs folder and read the `how.md`

### Contributor :
  If you have question or anything related you can ask me at `harry@efishery.com` or `twitter.com/hryer`