
window.gapi.load("auth2", function () {

    const auth2 = window.gapi.auth2.init();

    function buildUser() {
        const isSignedIn = auth2.isSignedIn.get();
        if (!isSignedIn) return null;
        const basicProfile = auth2.currentUser.get()?.getBasicProfile();
        if (!basicProfile) return null;
        return {
            id: basicProfile.getId(),
            name: basicProfile.getName(),
            email: basicProfile.getEmail()
        };
    }

    function dispatchGAPIUserUpdate() {
        const gapiUserEvent = new CustomEvent("gapi-user", { detail: buildUser() });
        console.log(gapiUserEvent);
        document.dispatchEvent(gapiUserEvent);
    }

    function signOutUser() {
        console.log("GAPI sign out");
        auth2.signOut();
    }

    function fetchObject(e) {
        console.log(e);

        const { callback } = e.detail;
        if (!callback) return;

        const isSignedIn = auth2.isSignedIn.get();
        if (!isSignedIn) callback(new Error("Not signed in"));

    }

    auth2.isSignedIn.listen(dispatchGAPIUserUpdate);

    document.addEventListener("request-user", dispatchGAPIUserUpdate);
    document.addEventListener("sign-out", signOutUser);
    document.addEventListener("fetch", fetchObject);

    dispatchGAPIUserUpdate();

});