# barnard59-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## What's intentionally left out

* Custom operations implemented with a local file, not that hard though
* Step `Arguments` should be a list in blocks, not a single `Input`

## What we learned

* We'd need customizing how connections look to make it visually clear which step can connect to which other step, color coding won't cut it because 1 block = 1 color
* Turtle generation via Clownface/rdf-string is great conceptually but generating readable turtle might be more work than stringifying as we go
* Turtle is a leaky format, there's no way of going from ttl to triples back to ttl without losing information
