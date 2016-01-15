# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Question Model', ->
  beforeEach ->
    @QuestionModel = new Frontend2.Models.Question();
