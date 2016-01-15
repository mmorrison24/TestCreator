# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Exams Collection', ->
  beforeEach ->
    @ExamsCollection = new Frontend2.Collections.Exams()
