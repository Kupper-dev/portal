"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-7":{"id":"e-7","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-7","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-8"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"9ef7e03c-11cb-208c-dffd-eafec29e6b7a"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1766855443680},"e-8":{"id":"e-8","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-8","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-7"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"9ef7e03c-11cb-208c-dffd-eafec29e6b7a"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1766855443680}},"actionLists":{"a-7":{"id":"a-7","title":"signup_company","actionItemGroups":[{"actionItems":[{"id":"a-7-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"selector":".company_wrapper","selectorGuids":["d025bcd5-8df3-3a2a-feb1-3f8ef445b321"]}}},{"id":"a-7-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"id":"9ef7e03c-11cb-208c-dffd-eafec29e6b7b"}}}]},{"actionItems":[{"id":"a-7-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"selector":".company_wrapper","selectorGuids":["d025bcd5-8df3-3a2a-feb1-3f8ef445b321"]}}},{"id":"a-7-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"id":"9ef7e03c-11cb-208c-dffd-eafec29e6b7b"}}}]}],"createdOn":1766854810074,"useFirstGroupAsInitialState":true},"a-8":{"id":"a-8","title":"signup company hide","actionItemGroups":[{"actionItems":[{"id":"a-8-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"selector":".company_wrapper","selectorGuids":["d025bcd5-8df3-3a2a-feb1-3f8ef445b321"]}}},{"id":"a-8-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"id":"9ef7e03c-11cb-208c-dffd-eafec29e6b7b"}}}]}],"createdOn":1766854919310,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SignupForm({
  as: _Component = _Builtin.Section,
  signUpCompleteRegisterButton = {},
  signUpMessageAboutYourCompany = {},
  companyEmployeesCompany110Employees = {},
  companyEmployeesCompany2150Employees = {},
  companyEmployeesCompany1120Employees = {},
  companyEmployeesCompany51OrMoreEmployees = {},
  signUpCompanyName = {},
  signUpCustomerPhone = {},
  signUpCustomerName = {},
  companyEmployeesCustomerSurnames = {},
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <_Component
      className="section blue"
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className="container signup"
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block className="padding-vertical" tag="div">
          <_Builtin.Grid className="signup_wrapper" tag="div">
            <_Builtin.Block
              className="form_content"
              id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b57-c29e6b53"
              tag="div"
            >
              <_Builtin.Image
                className="signup_app_icon"
                id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b58-c29e6b53"
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/694ca5d6e6b2e8d98c5ab18c_App%20Icon%20256.png"
              />
              <_Builtin.Block
                className="margin-bottom margin-large contact"
                tag="div"
              >
                <_Builtin.Block
                  className="margin-bottom margin-xsmall"
                  tag="div"
                >
                  <_Builtin.Heading className="heading-large" tag="h1">
                    {"Ya casi..."}
                  </_Builtin.Heading>
                </_Builtin.Block>
                <_Builtin.Block className="text-size-medium" tag="div">
                  <_Builtin.Strong>
                    {"Estás a un paso de simplificar tu tecnología."}
                    <br />
                    <br />
                  </_Builtin.Strong>
                  {
                    "Crea tu cuenta y accede a un portal donde podrás dar seguimiento a tus servicios, recibir soporte y mantener tus equipos siempre en óptimas condiciones con Kupper."
                  }
                  <br />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.FormWrapper className="signupform">
              <_Builtin.FormForm
                className="form_wrapper"
                name="wf-form-Email-Form"
                data-name="Email Form"
                action="/#"
                method="post"
                data-netlify="true"
                id="wf-form-Email-Form"
              >
                <_Builtin.Block className="signup_field" tag="div">
                  <_Builtin.Block className="form-field-wrapper" tag="div">
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="First-name"
                    >
                      {"Nombre"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className="form-input"
                      name="First-name"
                      maxLength={256}
                      data-name="First name"
                      placeholder="Juan"
                      disabled={false}
                      type="text"
                      required={true}
                      autoFocus={false}
                      id="First-name"
                      {...signUpCustomerName}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block className="form-field-wrapper" tag="div">
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="Last-name"
                    >
                      {"Apellidos"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className="form-input"
                      name="Last-name"
                      maxLength={256}
                      data-name="Last name"
                      placeholder="Hernandez"
                      disabled={false}
                      type="text"
                      required={true}
                      autoFocus={false}
                      id="Last-name"
                      {...companyEmployeesCustomerSurnames}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className="signup_field" tag="div">
                  <_Builtin.Block className="form-field-wrapper" tag="div">
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="Email"
                    >
                      {"Telefono o Whatsapp"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className="form-input"
                      name="Email"
                      maxLength={256}
                      data-name="Email"
                      placeholder="55 5555 0000"
                      disabled={false}
                      type="tel"
                      required={false}
                      autoFocus={false}
                      id="Email"
                      {...signUpCustomerPhone}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className="form-field-wrapper"
                    id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b74-c29e6b53"
                    tag="div"
                  >
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="Email"
                    >
                      {"Cuenta es para empresa"}
                      <br />
                      {"(Póliza de soporte)"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.Block className="form-radio-false" tag="div">
                      <_Builtin.Block
                        className="check_company"
                        data-w-id="9ef7e03c-11cb-208c-dffd-eafec29e6b7a"
                        tag="div"
                      >
                        <_Builtin.Image
                          data-w-id="9ef7e03c-11cb-208c-dffd-eafec29e6b7b"
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/69500bb1c5171e5c6d94c1aa_602ba3a163caee0dd1c4711ff867be64_check-circle.svg"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Si"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className="company_wrapper" tag="div">
                  <_Builtin.Block className="form-field-wrapper" tag="div">
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="Company-name"
                    >
                      {"Nombre de la empresa"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className="form-input"
                      name="Company-name"
                      maxLength={256}
                      data-name="Company name"
                      placeholder="Acme"
                      disabled={false}
                      type="text"
                      required={true}
                      autoFocus={false}
                      id="Company-name"
                      {...signUpCompanyName}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className="padding-vertical padding-xxsmall"
                    tag="div"
                  >
                    <_Builtin.Block className="form-field-wrapper" tag="div">
                      <_Builtin.Block
                        className="margin-bottom margin-xsmall"
                        tag="div"
                      >
                        <_Builtin.FormBlockLabel
                          className="field-label"
                          htmlFor="Contact-2-Select-2"
                        >
                          {"Numero de empleados."}
                        </_Builtin.FormBlockLabel>
                      </_Builtin.Block>
                      <_Builtin.Grid className="form-radio-2col" tag="div">
                        <_Builtin.FormRadioWrapper className="form-radio">
                          <_Builtin.FormRadioInput
                            className="form-radio-icon tick-icon"
                            type="radio"
                            name="Employees"
                            value="1-10"
                            data-name="Employees"
                            required={false}
                            id="1-10"
                            form={{
                              type: "radio-input",
                              name: "Employees",
                            }}
                            inputType="custom"
                            customClassName="w-form-formradioinput--inputType-custom"
                            {...companyEmployeesCompany110Employees}
                          />
                          <_Builtin.FormInlineLabel
                            className="form-radio-label"
                            htmlFor="Contact 2 Radio -11"
                          >
                            {"1-10"}
                          </_Builtin.FormInlineLabel>
                        </_Builtin.FormRadioWrapper>
                        <_Builtin.FormRadioWrapper
                          className="form-radio"
                          id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b8d-c29e6b53"
                        >
                          <_Builtin.FormRadioInput
                            className="form-radio-icon tick-icon"
                            type="radio"
                            name="Employees"
                            value="11-20"
                            data-name="Employees"
                            required={false}
                            id="11-20"
                            form={{
                              type: "radio-input",
                              name: "Employees",
                            }}
                            inputType="custom"
                            customClassName="w-form-formradioinput--inputType-custom"
                            {...companyEmployeesCompany1120Employees}
                          />
                          <_Builtin.FormInlineLabel
                            className="form-radio-label"
                            htmlFor="Contact 2 Radio -11"
                          >
                            {"11-20"}
                          </_Builtin.FormInlineLabel>
                        </_Builtin.FormRadioWrapper>
                        <_Builtin.FormRadioWrapper
                          className="form-radio"
                          id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b91-c29e6b53"
                        >
                          <_Builtin.FormRadioInput
                            className="form-radio-icon tick-icon"
                            type="radio"
                            name="Employees"
                            value="21-51"
                            data-name="Employees"
                            required={false}
                            id="21-51"
                            form={{
                              type: "radio-input",
                              name: "Employees",
                            }}
                            inputType="custom"
                            customClassName="w-form-formradioinput--inputType-custom"
                            {...companyEmployeesCompany2150Employees}
                          />
                          <_Builtin.FormInlineLabel
                            className="form-radio-label"
                            htmlFor="Contact 2 Radio -11"
                          >
                            {"21-50"}
                          </_Builtin.FormInlineLabel>
                        </_Builtin.FormRadioWrapper>
                        <_Builtin.FormRadioWrapper
                          className="form-radio"
                          id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b95-c29e6b53"
                        >
                          <_Builtin.FormRadioInput
                            className="form-radio-icon tick-icon"
                            type="radio"
                            name="Employees"
                            value="51 or more"
                            data-name="Employees"
                            required={false}
                            id="51-or-more"
                            form={{
                              type: "radio-input",
                              name: "Employees",
                            }}
                            inputType="custom"
                            customClassName="w-form-formradioinput--inputType-custom"
                            {...companyEmployeesCompany51OrMoreEmployees}
                          />
                          <_Builtin.FormInlineLabel
                            className="form-radio-label"
                            htmlFor="Contact 2 Radio -11"
                          >
                            {"51 o más"}
                          </_Builtin.FormInlineLabel>
                        </_Builtin.FormRadioWrapper>
                      </_Builtin.Grid>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block className="form-field-wrapper" tag="div">
                    <_Builtin.FormBlockLabel
                      className="field-label"
                      htmlFor="Company-I.T.-Requirements"
                    >
                      {
                        "Platícanos mas sobre tu negocio y sus necesidades de T.I."
                      }
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextarea
                      className="form-input text-area"
                      name="Company-I.T.-Requirements"
                      maxLength={5000}
                      data-name="Company I.T. Requirements"
                      placeholder="Escribe tu mensaje"
                      required={false}
                      autoFocus={false}
                      id="Company-I.T.-Requirements"
                      {...signUpMessageAboutYourCompany}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.FormButton
                  className="signup_button max-width-full"
                  id="w-node-_9ef7e03c-11cb-208c-dffd-eafec29e6b9d-c29e6b53"
                  type="submit"
                  value="Completar registro"
                  data-wait="Por favor espera..."
                  {...signUpCompleteRegisterButton}
                />
              </_Builtin.FormForm>
              <_Builtin.FormSuccessMessage className="success-message">
                <_Builtin.Block className="success-text" tag="div">
                  {"Thank you! Your submission has been received!"}
                </_Builtin.Block>
              </_Builtin.FormSuccessMessage>
              <_Builtin.FormErrorMessage className="error-message">
                <_Builtin.Block className="error-text" tag="div">
                  {"Oops! Something went wrong while submitting the form."}
                </_Builtin.Block>
              </_Builtin.FormErrorMessage>
            </_Builtin.FormWrapper>
          </_Builtin.Grid>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
