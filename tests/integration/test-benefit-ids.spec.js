import expect from "expect"

import Benefits from "../../data/index.js"
import jamstackLoader from "jamstack-loader"
import aidesVeloGenerator from "../../data/benefits/aides-velo-generator.js"

const configFile = "contribuer/public/admin/config.yml"

describe("Benefit id", () => {
  const jamstack = jamstackLoader.get(configFile)

  const javascriptBenefits = jamstack.collections.benefits_javascript.items.map(
    (benefit) => {
      benefit.source = "javascript"
      return benefit
    }
  )
  const openfiscaBenefits = jamstack.collections.benefits_openfisca.items.map(
    (benefit) => {
      benefit.source = "openfisca"
      return benefit
    }
  )

  const aidesVeloBenefits = aidesVeloGenerator([])
  aidesVeloBenefits.forEach((benefit) => {
    benefit.source = "aides-velo"
  })

  const benefits = [
    ...javascriptBenefits,
    ...openfiscaBenefits,
    ...aidesVeloBenefits,
  ].map((benefit) => {
    benefit.id = Benefits.generateBenefitId(benefit)
    return benefit
  })
  const benefitsIds = []

  for (const benefit of benefits) {
    describe(`${benefit.source} - ${benefit.id}`, () => {
      it("should be unique", () => {
        expect(benefitsIds).not.toContain(benefit.id)
        benefitsIds.push(benefit.id)
      })
    })
  }
})
