# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Test Model', ->
  beforeEach ->
    @TestModel = new Frontend2.Models.Test();
