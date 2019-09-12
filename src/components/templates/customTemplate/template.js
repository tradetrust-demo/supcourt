import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import { format } from "date-fns";
import { get } from "lodash";

const renderEntities = entities => {
  const renderedEntities = entities.map((entity, i) => (
    <div key={i}>
      <div>{entity.name}</div>
      <div>(NRIC No. {entity.nric})</div>
    </div>
  ));
  return <div>{renderedEntities}</div>;
};

const renderOrderedList = (list, level, key) => {
  const type = ["1", "a", "i", "A", "I"];
  return (
    <ol type={get(type, level, 0)} key={key}>
      {list.map((item, i) =>
        typeof item !== "object" ? (
          <li key={i} className="p-2">
            {item}
          </li>
        ) : (
          renderOrderedList(item, level + 1, i)
        )
      )}
    </ol>
  );
};

const interimJudgement = judgement => {
  return <div>{renderOrderedList(judgement, 0)}</div>;
};

const Template = ({ document }) => {
  return (
    <div className="container">
      <div className="text-center font-weight-bold mb-4">
        IN THE FAMILY JUSTICE COURTS OF THE REPUBLIC OF SINGAPORE
      </div>
      <div className="row">
        <div className="col-6">
          <div className="p-1">Case No.: {get(document, "caseNo")}</div>
          <div className="p-1">Doc No.: {get(document, "id")}</div>
          <div className="p-1">
            Filed:{" "}
            {format(
              Date.parse(get(document, "filedDate")),
              "dd MMMM yyyy h:mm a"
            )}
          </div>
          <div className="p-1">
            Date of Order:{" "}
            {format(Date.parse(get(document, "orderDate")), "dd MMMM yyyy")}
          </div>
          <div className="p-1">Made By: {get(document, "madeBy")}</div>
          <div className="m-3">
            <img src="/seal.png" style={{ width: 100, height: "auto" }}></img>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center">Between</div>
          {renderEntities(get(document, "plaintiffs"))}
          <div className="text-right">...Plaintiff</div>
          <div className="text-center">And</div>
          {renderEntities(get(document, "defendants"))}
          <div className="text-right">...Defendant</div>
        </div>
      </div>
      <div className="text-center font-weight-bold mt-4 mb-4">
        INTERIM JUDGEMENT
      </div>
      {interimJudgement(get(document, "interimJudgement"))}
      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">
          <div>
            <img
              src={get(document, "signatory.signature")}
              style={{ width: 200 }}
            ></img>
          </div>
          <div>{get(document, "signatory.name")}</div>
          <div>REGISTRAR</div>
          <div>FAMILY JUSTICE COURTS SINGAPORE</div>
        </div>
      </div>
    </div>
  );
};

Template.propTypes = {
  document: PropTypes.object.isRequired
};

export default Template;
