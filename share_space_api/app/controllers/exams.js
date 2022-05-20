const Exam = require("../models/exams")

class ExamsCtl {

  async create (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const repeatedExam = await Exam.findOne({ name })
    if (repeatedExam) ctx.throw(409, '该考试已存在')
    let exam = await new Exam(ctx.request.body).save()
    ctx.body = exam
  }
  async find (ctx) {
    ctx.body = await Exam.find()
  }

}

module.exports = new ExamsCtl()