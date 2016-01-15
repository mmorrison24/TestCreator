# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Exam Model', ->
  beforeEach ->
    @ExamModel = new Frontend2.Models.Exam();
