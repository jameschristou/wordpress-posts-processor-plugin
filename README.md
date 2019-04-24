## wordpress-posts-processor-plugin
Wordpress plugin which allows you to run custom code on a set/all of your wordpress posts. For example if you need to update each post in some custom way

## Plugin Usage
Insert the list of posts you want to republish to the table wp_posts_to_publish table with published=0.
Then activate the plugin and go to the "Posts Republisher" page from WP admin. You must be an administrator
in Wordpress in order to see this page.

You will see how many posts are available for publishing. If you hit "Start" it will start republishing the posts
one at a time and record each post republished.

## Front End Build
Run `npm install` to install all packages and depenedencies.

Dev
To compile front end assets while developing use `npm run dev`.

Production
`npm run build`