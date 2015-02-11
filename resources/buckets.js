exports.patch = function(Dribbble) {
  var patchShot = function(bucket) {
    var shots = {};
    Object.defineProperty(bucket, 'shots', { value: shots });
    shots.list = function(id, callback) {
      return Dribbble.request().get('/buckets/' + bucket.id + '/shots', callback);
    };

    shots.add = function(id, callback) {
      return Dribbble.request().put('/buckets/' + bucket.id + '/shots', {
        shot_id: id
      }, callback);
    };

    shots.destroy = shots.delete = function(id, callback) {
      return Dribbble.request().destroy('/buckets/' + bucket.id + '/shots', {
        shot_id: id
      }, callback);
    };
  };

  var base = Dribbble.prototype.buckets = {};

  base.get = function(id, callback) {
    return Dribbble.request(patchShot).get('/buckets/' + id, callback);
  };

  base.create = function(body, callback) {
    return Dribbble.request(patchShot).post('/buckets', body, callback);
  };

  base.update = function(id, body, callback) {
    return Dribbble.request(patchShot).put('/buckets/' + id, body, callback);
  };

  base.destroy = base.delete = function(id, body, callback) {
    return Dribbble.request().destroy('/buckets/' + id, callback);
  };
};
