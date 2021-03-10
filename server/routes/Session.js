var express = require('express');
app = express()

app.post('/join', cors(),  [
  body('email').isEmail().normalizeEmail().withMessage("Email must be valid").trim().escape(),
  body('password').isLength({ min: 5 }).isString().withMessage("Length must be 5 characters"),
  body('phone').isMobilePhone().trim().escape(),
  body('country').isISO31661Alpha3().trim().escape(),
  body('zip_code').optional().isPostalCode('any').trim().escape(),
  body('postal_code').isString().trim().escape(),
] ,async (req, res) => {
  let body = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let existingUser = await model.user.findOne({email: body.email});
  if(existingUser){
    return res.status(409).json({ error: body.email + " is already used"})
  } else {
    bcrypt.hash(body.password, 10, async (err, hash) => {
      const user = new model.user({
        email: body.email,
        password: hash,
        phone: body.phone,
        country: body.country,
        zip_code: body.zip_code,
        postal_code: body.postal_code,
        member: 'free'
      });

      await user.save(function(err) {
        if(err) {
          res.status(500).send("Internal server error")
          console.log(err)
        } else {
          let token = jwt.sign({
            "id": user._id,
            "role": user.member,
            "country": user.country,
            "email": user.email
          }, config.secret, {
            "expiresIn": "6h"
          })
          res.status(201).json({"token":token})
        }
      });
    });
  }


module.exports = app;