'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var chalk = require('chalk');
var fs = require('fs');

// var mysql = require('mysql');

// var mysql_conn = mysql.createConnection({
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   database: 'dgs-server_development'
// });

_.str = require('underscore.string');
_.mixin(_.str.exports());


var TpAngularGenerator = yeoman.generators.NamedBase.extend({
  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the superior TpAngular generator!'
    ));

    var prompts = [{
          name: 'appname',
          message: 'Enter your project name?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appname = props.appname;
      done();
    }.bind(this));
  },

  // writing: {
  //   app: function () {
  //     this.dest.mkdir('app');
  //     this.dest.mkdir('app/templates');

  //     this.src.copy('_package.json', 'package.json');
  //     this.src.copy('_bower.json', 'bower.json');
  //   },

  //   projectfiles: function () {
  //     this.src.copy('editorconfig', '.editorconfig');
  //     this.src.copy('jshintrc', '.jshintrc');
  //   }
  // },

  // end: function () {
  //   this.installDependencies();
  // }
  crud: function() {
    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';
  this.resource = this.name; // user
  this.resource_cap = this.name.charAt(0).toUpperCase() + this.name.slice(1); // User
  this.resource_pluralize = this.name+'s'; // users
  var args = this.args;
  var name = []
  var input = []
  var th = []
  var td = []
  var fields = []
  for(var i=1; i<args.length; i++)
  { 
    var string = args[i].split(":");
    if(string[0].slice(-3) === '_id' && string[1] === 'integer')
    {
      var name = (string[0]);
      input.push('<div class="form-group" ng-class="{\'has-error\' : '+this.resource+'.'+name+'.$invalid && !'+this.resource+'Form.'+name+'.$pristine}">\n\
            <label>'+name+'</label>\n\
            <select name="'+name+'" ng-model="current'+this.resource_cap+'.'+name+'" class="form-control" required>\n\
            <option> </option>\n\
            </select>\n\
            <p ng-show="'+this.resource+'Form.'+name+'.$invalid && !'+this.resource+'.'+name+'.$pristine" class="help-block" > Your error message here.</p>\n\
          </div> \n');
      th.push('\n <th>'+name+'</th>\n');
      fields.push(string[0]+': " "');
      td.push('\n <td>{{'+this.resource+'.'+name+'}}</td>\n');
    }
    else if(string[1] === 'integer')
    {
      var name = (string[0]);
      input.push('\t \t \t \t \t<div class="form-group" ng-class="{\'has-error\' : '+this.resource+'.'+name+'.$invalid && !'+this.resource+'Form.'+name+'.$pristine}">\n\
            <label>'+name+'</label>\n\
            <input type="text" name="'+name+'" ng-model="current'+this.resource_cap+'.'+name+'" class="form-control" required>\n\
            </input>\n\
            <p ng-show="'+this.resource+'Form.'+name+'.$invalid && !'+this.resource+'.'+name+'.$pristine" class="help-block" > Your error message here.</p>\n\
        \t</div> \n');
      th.push('\t \t \t \t \t \t<th>'+name+'</th>\n');
      fields.push(string[0]+': " "');
      td.push('\t \t \t \t \t \t<td>{{'+this.resource+'.'+name+'}}</td>\n');
    }
    else if(string[1] === 'text')
    {
      var name = (string[0]);
      input.push('\t \t \t \t \t<div class="form-group" ng-class="{\'has-error\' : '+this.resource+'.'+name+'.$invalid && !'+this.resource+'Form.'+name+'.$pristine}">\n\
            <label>'+name+'</label>\n\
            <input type="textarea" name="'+name+'" ng-model="current'+this.resource_cap+'.'+name+'" class="form-control" required>\n\
            </input>\n\
            <p ng-show="'+this.resource+'Form.'+name+'.$invalid && !'+this.resource+'.'+name+'.$pristine" class="help-block" > Your error message here.</p>\n\
        \t</div> \n');
      th.push('\t \t \t \t \t \t<th>'+name+'</th>\n');
      fields.push(string[0]+': " "');
      td.push('\t \t \t \t \t \t<td>{{'+this.resource+'.'+name+'}}</td>\n');
    }
    else if(string[1] === 'string')
    {
      var name = (string[0]);
      input.push('\t \t \t \t \t<div class="form-group" ng-class="{\'has-error\' : '+this.resource+'.'+name+'.$invalid && !'+this.resource+'Form.'+name+'.$pristine}">\n\
            <label>'+name+'</label>\n\
            <input type="text" name="'+name+'" ng-model="current'+this.resource_cap+'.'+name+'" class="form-control" required>\n\
            </input>\n\
            <p ng-show="'+this.resource+'Form.'+name+'.$invalid && !'+this.resource+'.'+name+'.$pristine" class="help-block" > Your error message here.</p>\n\
        \t</div> \n');
      th.push('\t \t \t \t \t \t<th>'+name+'</th>\n');
      fields.push(string[0]+': " "');
      td.push('\t \t \t \t \t \t<td>{{'+this.resource+'.'+name+'}}</td>\n');
    }
    else
    {
      // do nothing
    }
  }

  th = th.join(" ");
  input = input.join(" ");
  td = td.join(" ");

  var context = { 
    appname: this.appname,
    ctrlname: _.camelize(_.classify(this.name)) + 'Ctrl',
    resource: this.name, // user
    resource_cap: this.name.charAt(0).toUpperCase() + this.name.slice(1), // User
    resource_pluralize: this.name+'s', // users
    name: name,
    input: input,
    th: th,
    td: td,
    fields: fields
  };

  this.template('crud.html', 'app/controllers/'+this.name+'/'+this.name+'.html',context);
  this.template('crud.js', 'app/controllers/'+this.name+'/'+this.name+'.js',context);
  this.template('crud.less', 'app/controllers/'+this.name+'/'+this.name+'.less',context);
  this.template('crud-spec.js', 'app/controllers/'+this.name+'/'+this.name+'-spec.js',context);
  }
});

module.exports = TpAngularGenerator;