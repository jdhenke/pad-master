Pad Master
==========

Acts as simple serializer and propagator of updates for [pad-web](https://github.com/jdhenke/pad-web).

## Local Usage

```bash
foreman start
```

## Heroku

```bash
# start a weak dyno
heroku scale web=1:1X

# start a x16 power dyno
heroku scale web=1:PX

# shut it down to save money
heroku scale web=0:1X
```
