const Donation = require('../models/donation');
const User = require('../models/user');

const donorController = {
  getDashboard: async (req, res) => {
    try {
      const donorId = req.user._id;
      const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: 'pending' });
      const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: 'accepted' });
      const numAssignedDonations = await Donation.countDocuments({ donor: donorId, status: 'assigned' });
      const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: 'collected' });

      res.render('donor/dashboard', {
        title: 'Dashboard',
        numPendingDonations,
        numAcceptedDonations,
        numAssignedDonations,
        numCollectedDonations,
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getDonateForm: (req, res) => {
    res.render('donor/donate', { title: 'Donate' });
  },

  postDonateForm: async (req, res) => {
    try {
      const donation = req.body.donation;
      donation.status = 'pending';
      donation.donor = req.user._id;
      const newDonation = new Donation(donation);
      await newDonation.save();
      req.flash('success', 'Donation request sent successfully');
      res.redirect('/donor/donations/pending');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getPendingDonations: async (req, res) => {
    try {
      const pendingDonations = await Donation.find({
        donor: req.user._id,
        status: { $in: ['pending', 'rejected', 'accepted', 'assigned'] },
      }).populate('agent');
      res.render('donor/pendingDonations', { title: 'Pending Donations', pendingDonations });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getPreviousDonations: async (req, res) => {
    try {
      const previousDonations = await Donation.find({
        donor: req.user._id,
        status: 'collected',
      }).populate('agent');
      res.render('donor/previousDonations', { title: 'Previous Donations', previousDonations });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  deleteRejectedDonation: async (req, res) => {
    try {
      const donationId = req.params.donationId;
      await Donation.findByIdAndDelete(donationId);
      res.redirect('/donor/donations/pending');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getProfile: (req, res) => {
    res.render('donor/profile', { title: 'My Profile' });
  },

  updateProfile: async (req, res) => {
    try {
      const id = req.user._id;
      const updateObj = req.body.donor; // updateObj: { firstName, lastName, gender, address, phone }
      await User.findByIdAndUpdate(id, updateObj);

      req.flash('success', 'Profile updated successfully');
      res.redirect('/donor/profile');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },
};

module.exports = donorController;
