import React from "react";
import { SETTINGS } from "../../../types/settings";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { WORK } from "../../../types/work";
import { SUBJECT } from "../../../types/subject";
import { ACADEMICLEVEL } from "../../../types/academicLevel";
import AcademicLevelModal from "../../modal/academicLevel";
import WorkModal from "../../modal/work";
import SubjectModal from "../../modal/subject";
import { REFERENCESTYLE } from "../../../types/referenceStyle";
import ReferenceStyleModal from "../../modal/referencestyle";

interface PROPS {
  Store: any;
  details: SETTINGS;
  refetch: () => void;
}

const UpdateSettings = (props: PROPS) => {
  const { Store, details, refetch } = props;
  const [work, setWork] = React.useState("");
  const [workDetails, setWorkDetails] = React.useState({
    _id: "",
    amount: "",
    workType: "",
  });
  const [openWork, setOpenWork] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [subjectDetails, setSubjectDetails] = React.useState({
    _id: "",
    subjectName: "",
  });
  const [openSubject, setOpenSubject] = React.useState(false);

  const [level, setLevel] = React.useState("");
  const [openLevel, setOpenLevel] = React.useState(false);
  const [openStyle, setOpenStyle] = React.useState(false);
  const [levelDetails, setLevelDetails] = React.useState({
    _id: "",
    academicLevel: "",
    amount: "",
  });
  const [styleReference, setStyleReference] = React.useState("");
  const [referenceDetails, setReferenceDetails] = React.useState({
    _id: "",
    referencingStyleType: "",
    amount: "",
  });
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
  };
  const handleChangeSubject = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
  };
  const handleChangeWork = (event: SelectChangeEvent) => {
    setWork(event.target.value);
    // setWorkText(event.target.value);
  };
  const handleChangeStyleReference = (event: SelectChangeEvent) => {
    setStyleReference(event.target.value);
  };

  const openWorkModal = (value: WORK) => {
    setWorkDetails(value);
    setOpenWork(true);
    setOpenSubject(false);
    setOpenLevel(false);
    setOpenStyle(false);
  };
  const openSubjectModal = (value: SUBJECT) => {
    setSubjectDetails(value);
    setOpenWork(false);
    setOpenSubject(true);
    setOpenLevel(false);
    setOpenStyle(false);
  };
  const openLevelModal = (value: ACADEMICLEVEL) => {
    setLevelDetails(value);
    setOpenWork(false);
    setOpenSubject(false);
    setOpenLevel(true);
    setOpenStyle(false);
  };
  const openStyleModal = (value: REFERENCESTYLE) => {
    setReferenceDetails(value);
    setOpenWork(false);
    setOpenSubject(false);
    setOpenLevel(false);
    setOpenStyle(true);
  };
  return (
    <div>
      {" "}
      {openLevel && (
        <AcademicLevelModal
          Store={Store}
          currentRowDetails={levelDetails}
          open={openLevel}
          setOpen={setOpenLevel}
          refetch={refetch}
        />
      )}
      {openWork && (
        <WorkModal
          Store={Store}
          currentRowDetails={workDetails}
          open={openWork}
          setOpen={setOpenWork}
          refetch={refetch}
        />
      )}
      {openSubject && (
        <SubjectModal
          Store={Store}
          currentRowDetails={subjectDetails}
          open={openSubject}
          setOpen={setOpenSubject}
          refetch={refetch}
        />
      )}
      {openStyle && (
        <ReferenceStyleModal
          Store={Store}
          currentRowDetails={referenceDetails}
          open={openStyle}
          setOpen={setOpenStyle}
          refetch={refetch}
        />
      )}
      <div className="text-xl font-semibold text-center px-8 text-gray-600">
        Choose one item and you will be given the option <br /> to either update
        or remove it.
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="flex space-x-4 items-center flex-wrap mt-2">
          <div>
            <div>Type of work</div>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Type of work
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={work}
                label="Work"
                onChange={handleChangeWork}
              >
                {details.allWork.map((item) => {
                  return (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      onClick={() => {
                        openWorkModal(item);
                      }}
                    >
                      {item.workType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <div className="">Referencing style</div>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Reference style
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={styleReference}
                label="Reference style"
                onChange={handleChangeStyleReference}
              >
                {details.referencingStyles.map(
                  (item: {
                    _id: string;
                    amount: string;
                    referencingStyleType: string;
                  }) => {
                    return (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        onClick={() => {
                          openStyleModal(item);
                        }}
                      >
                        {item.referencingStyleType}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div>
            <div>Subject</div>

            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">
                subject
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={subject}
                label="subject"
                onChange={handleChangeSubject}
              >
                {details.allSubjects.map((item) => {
                  return (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      onClick={() => {
                        openSubjectModal(item);
                      }}
                    >
                      {item.subjectName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <div>Academic level</div>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={level}
                label="College"
                onChange={handleChangeLevel}
              >
                {details.academicLevels.map(
                  (item: {
                    _id: string;
                    academicLevel: string;
                    amount: string;
                  }) => {
                    return (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        onClick={() => {
                          openLevelModal(item);
                        }}
                      >
                        {item.academicLevel}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateSettings;
