var isSaving = false;

export default store => next => action => {
    next(action);
    if (typeof action === "object" && !action.noSave && !isSaving) {
        isSaving = true;
        let data = store
            .getState()
            .get("home")
            .toJS();
        fetch("/api/save", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            isSaving = false;
        });
    }
};
