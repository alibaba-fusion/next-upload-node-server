'use strict';
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const {Controller} = require('egg');
const debug = require('debug')('next:home');
const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);

class HomeController extends Controller {
  async index() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/index.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent.replace('CSRF_TOKEN', ctx.csrf);
  }

  async form() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/form.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent.replace('CSRF_TOKEN', ctx.csrf);
  }

  async oss() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/oss.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent.replace('CSRF_TOKEN', ctx.csrf);
  }

  async upyun() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/upyun.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent.replace('CSRF_TOKEN', ctx.csrf);
  }

  async qiniu() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/qiniu.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent.replace('CSRF_TOKEN', ctx.csrf);
  }

  async fileUpload() {
    const {ctx} = this;
    const {baseDir} = ctx.app;

    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const time = Date.now();
    debug('name: %s', name);
    const filePath = path.join(baseDir, '/files', `/${time}-${name}`);
    try {
      await new Promise((resolve, reject) => {
        stream.on('data', data => appendFile(filePath, data));
        stream.on('end', () => resolve());
        stream.on('error', error => reject(error));
      });
      this.ctx.body = {
        success: true,
        url: 'https://dummyimage.com/600x300/#fff&text=Upload%20%E6%88%90%E5%8A%9F',
      };
    } catch (error) {
      this.ctx.body = {
        success: false,
      };
    }
    
  }
}

module.exports = HomeController;
