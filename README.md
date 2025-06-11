# AngularIndexedDBDemo

An Angular demo application that shows the use **indexedDB** in the browser.

**indexedDB** is an alternative for _localStorage_ and is more convenient.

**indexedDB** can store more data in the browser, where _localStorage_ is limited to 5MB.

With **indexedDB** the data is persistent between page reloads.

See the images in the root of this project for examples.

## **Application**

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

In this application CRUD-operations to **indexedDB** work with either Promises and Observables.

To see the stored data, go to **Developer Tools** of the browser -> **Application** tab -> **Storage** \-> **indexedDB**

Further, this application can add and update persons, which will be stored in **indexedDB**.

The data is persistent between page navigations and page reloads.

## Installation + run app

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_June 2025_

\- Upgrade to Angular 20. 

\- Removed unnecessary package _@angular/platform-browser-dynamic_

\- Some small changes.