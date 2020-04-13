# K-Means-Clustering

The implementation of K-Means Clustering is based on Lloyd's algorithm:

```
define k (number of clusters)
define k starting points (for the clusters) from all given data points
while assignment changes:
  assign each point to a cluster where the eucledian distance between the cluster's point and the given data point is the smallest
  assignment (the cluster's mid point): point_cluster = (1/n) * sum(all points within that cluster) where n is the number of points within that cluster
end while
```

Details: https://en.wikipedia.org/wiki/K-means_clustering

<img src="https://github.com/moritzmitterdorfer/K-Means-Clustering/blob/master/img.png" width="200" alt="sample output">

## Run
Start a server and run `index.html`.

## Documentation
> I do not recommend using that model, it's just for undestanding the concept haha

### KMeans(data, [k, accuracy])
constructor function
```
KMeans(data, [k, accuracy])
```
*data* - array2d, array of numbers
*k* - number, number of clusters (default: 3)
*accuracy* - number, 0 < high accuracy < 1 < small accuracy (default: 0.000001)

### train() : void
trains the model
```
kmeans.train()
```

### predict(point) : string
predicts a new data point
```
kmeans.predict([value_1, value_2, ..., value_n]) 
```
*point* - array1d, length must match dimension of training data
*returns* the name of the cluster ('C0', 'C1', ... , 'C'n)

### renameCluster(old, label) : void
renames a cluster (default names: 'C0', 'C1', ... , 'C'n (n is the dimension of the input data)
```
kmeans.renameCluster('C0', 'myCluster')
```
*old* - string, cluster's old name
*label* - string, cluster's new name

### static normalize(array2d) : array2d 
normalizes array2d (i.e. elements of array)
```
kmeans.normalize([[value_1, value_2, ..., value_n], ..., [value_1, value_2, ..., value_n]])
```
*array2d* - array2d, array to normalize
*returns* normalized array
