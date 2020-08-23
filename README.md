# Antstack Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Overview and references

The dashboard is used to display csv data{that was given in the zip file} in table format.

All the **material design** were referenced from [Angular Materials](https://material.angular.io/) (Table, paginator, sorter and icons)

A step buy step guide for hosting application can be found [here](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147)

**The working dashboard is hosted [here](https://antstack-dashboard.herokuapp.com/)**

## Setting up the environment for local development

Run `npm install` after pulling the source code, in the source directory.

## Running Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dashboard Features

- Dashboard has 2 filters, **Pincode Filter** and **Date Filter**.

LIMITATION of filters: Both the filters don't work together, ie, you can apply one filter at a time.

- I have implemented pagination in the dashboard, because number of records were more than 300. A user can view 5, 10, 25, and 50 rows at a time.

- I have also implemented sort function for all the fields.
