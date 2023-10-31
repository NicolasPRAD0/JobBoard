const authController = require('../controllers/auth.controller')
const jobOfferController = require('../controllers/jobOffer.controller')
const companiesController= require('../controllers/company.controller')

const jobApplicationController=require("../controllers/jobApplication.controller")
const userController = require('../controllers/user.controller')


module.exports = (app) => {
    //auth
    app.post('/auth/register', authController.register)
    app.post('/auth/login', authController.login)
  
    //offers
    app.post('/offer/createOffer', jobOfferController.createOffer)
    app.get('/offer/getAll', jobOfferController.fetchOffers)
    app.get('/offer/getById/:id', jobOfferController.getOfferById)
    app.put('/offer/updateOffer/:id', jobOfferController.updateOffer)
    app.delete('/offer/deleteOffer/:id', jobOfferController.deleteOffer)
    app.get('/offers/getAll',jobOfferController.getAll)
    app.post('/offer/jobAppliance/:id', jobApplicationController.jobApplication)
    app.get('/offer/offerApplied/:id', jobApplicationController.getByApplicantId)
    app.get('/offers/applications/getAll',jobApplicationController.getAll)
    
    //users
    app.get('/user/:id', userController.fetchOne)
    app.put('/user/edit', userController.edit)
    app.get('/users/getAll',userController.getAll)

    //companies
    app.get('/companies/getAll',companiesController.getAll)
    app.post('/companies/create',companiesController.create)
    app.post('/companies/login', companiesController.login)
    app.put('/companies/edit', companiesController.edit)
    app.get('/companies/recruiters/:id', companiesController.getRecruiters)
    app.put('/companies/recruiter/add', companiesController.addRecruiter)
    
}