# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Questions Collection', ->
  beforeEach ->
    @QuestionsCollection = new Frontend2.Collections.Questions()
