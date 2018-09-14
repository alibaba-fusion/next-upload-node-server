'use strict';
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const Controller = require('egg').Controller;
const readFile = promisify(fs.readFile);


class HomeController extends Controller {
  async index() {
    const {ctx} = this;
    const {baseDir} = ctx.app;
    const filePath = path.join(baseDir, '/app/view/index.html');
    const fileContent = await readFile(filePath, 'utf8');
    this.ctx.body = fileContent;
  }

  async fileUpload() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
