get-data
=========

This is a server for generating random data which needs for histogram and other various charts. To work with this, you need to start node.js server and make GET request to /data/:start/:end with specifying the timestamp of start and end.
###Request
```
localhost:3000/data/1392872400000/1393509064727
```
###Response
```
[ { timestamp: value } ]
```

The response from the sever will include the array of piece of data. Each piece is the timestamp rounded for the full hours and include the example data. This data, in full picture visualized as simple sinusoidal graphic.
