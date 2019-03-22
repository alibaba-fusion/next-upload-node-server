'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/form', controller.home.form);
  router.get('/oss', controller.home.oss);
  router.post('/file', controller.home.fileUpload);
  router.get('/upyun', controller.home.upyun);
  router.get('/qiniu', controller.home.qiniu);
};
