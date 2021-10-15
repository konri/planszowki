const Button = require("./Button")
// @ponicode
describe("getContainerStyle", () => {
    let inst

    beforeEach(() => {
        inst = new Button.Button()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getContainerStyle()
        }
    
        expect(callFunction).not.toThrow()
    })
})
