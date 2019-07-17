# Mercury
<img src="mercury.jpg" height=200 align=left vspace=20 />
><details>
>><summary>
### Compiling Sass files to CSS
</summary>
The project's CSS (src/main/resources/static/css/main.css and src/main/resources/static/css/material.css) is compiled from the Sass components in src/main/sass.  
The compiled CSS is included in the repo so the steps below are only needed if you intend to make changes to any of the Sass components.

- Install the project's gem bundle in your local environment
	- install ruby if required
	- `gem install bundler`
	- `bundle install`
- Start compass from the project root
	- `compass watch`
- Compass will build a new copy of css/screen.css each time changes to a Sass component are detected. 
- By default the compiled CSS will be minified - you can override the output style while in development by using the --output-style and --force options as follows:
	- `compass watch --output-style expanded --force` 
</details>
