const ProfileDAO = require("../data/profile-dao").ProfileDAO;
const ESAPI = require("node-esapi");
const {
    environmentalScripts
} = require("../../config/config");

/* The ProfileHandler must be constructed with a connected db */
function ProfileHandler(db) {
    "use strict";

    const profile = new ProfileDAO(db);

    this.displayProfile = (req, res, next) => {
        const {
            userId
        } = req.session;



        profile.getByUserId(parseInt(userId), (err, doc) => {
            if (err) return next(err);
            doc.userId = userId;

            // @TODO @FIXME
            // while the developer intentions were correct in encoding the user supplied input so it
            // doesn't end up as an XSS attack, the context is incorrect as it is encoding the firstname for HTML
            // while this same variable is also used in the context of a URL link element
        // doc.website = ESAPI.encoder().encodeForHTML(doc.website);
            // fix it by replacing the above with another template variable that is used for 
            // the context of a URL in a link header
        doc.website = ESAPI.encoder().encodeForURL(doc.website);

            return res.render("profile", {
                ...doc,
                environmentalScripts
            });
        });
    };

    this.handleProfileUpdate = (req, res, next) => {

        const {
            firstName,
            lastName,
            ssn,
            dob,
            address,
            bankAcc,
            bankRouting
        } = req.body;

        // Fix for Stored XSS - validate name fields before they can ever be stored
        const NAME_RE = /^[a-zA-Z' -]{1,100}$/;
        if (!NAME_RE.test(firstName) || !NAME_RE.test(lastName)) {
            return res.render("profile", {
                updateError: "Names may contain only letters, spaces, hyphens and apostrophes",
                firstName, lastName, ssn, dob, address, bankAcc, bankRouting,
                userId: req.session.userId, environmentalScripts
            });
        }

        // Fix for Section: ReDoS attack
        // The following regexPattern that is used to validate the bankRouting number is insecure...
        const regexPattern = /([0-9]+)+\#/;
        const testComplyWithRequirements = regexPattern.test(bankRouting);
        if (testComplyWithRequirements !== true) {
            const firstNameSafeString = firstName;
            return res.render("profile", {
                updateError: "Bank Routing number does not comply with requirements for format specified",
                firstNameSafeString,
                lastName,
                ssn,
                dob,
                address,
                bankAcc,
                bankRouting,
                environmentalScripts
            });
        }

        const {
            userId
        } = req.session;

        profile.updateUser(
            parseInt(userId),
            firstName,
            lastName,
            ssn,
            dob,
            address,
            bankAcc,
            bankRouting,
            (err, user) => {
                // ... unchanged
            }
        );

    };

}

module.exports = ProfileHandler;
