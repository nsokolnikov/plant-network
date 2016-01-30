ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: Meteor.settings.client_id,
    secret: Meteor.settings.client_secret
});