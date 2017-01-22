import numpy as np, numpy.random
data = {}
year = 2017
month = 1
day = 1
for hour in range(24):
    key = '%s_%s_%s_%s' % (year, month, day, hour)
    data[key] = {}
    nums = np.random.dirichlet(np.ones(5),size=1)
    data[key]['anger'] = nums[0]
    data[key]['disgust'] = nums[1]
    data[key]['fear'] = nums[2]
    data[key]['joy'] = nums[3]
    data[key]['sadness'] = nums[4]
    data[key]['entries'] = np.random_integers(1,10)
