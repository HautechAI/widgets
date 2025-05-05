import { SettingsIcon } from "@hautechai/webui.icon";
import { IconButton } from "@hautechai/webui.iconbutton";
import { Theme } from "@hautechai/webui.theme";
import { Field } from "@hautechai/webui.field";
import { SegmentedControl } from "@hautechai/webui.segmentedcontrol";
import { FC, useState } from "react";
import { MODEL_OPTIONS } from "../InitialModelSelection";
import { Modal, ModalContent } from "@hautechai/webui.modal";
import { Typography } from "@hautechai/webui.typography";
import { Button } from "@hautechai/webui.button";
import { TextButton } from "@hautechai/webui.textbutton";
import { Row } from "@hautechai/webui.row";
import { Column } from "@hautechai/webui.column";
import { Props } from "./types";

import S from "./style";

export const AdvancedSettings: FC<Props> = ({ selectedModel, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSelectedValue, setNewSelectedValue] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [segmentedKey, setSegmentedKey] = useState(0);

  const handleModelChange = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newValue: string
  ) => {
    if (newValue === selectedModel) return;
    setNewSelectedValue(newValue);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (newSelectedValue !== null) {
      onConfirm(newSelectedValue);
    }
    setNewSelectedValue(null);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setNewSelectedValue(null);
    setModalOpen(false);
    setSegmentedKey((prev) => prev + 1);
  };

  return (
    <S.Wrapper
      padding="xs"
      paddingLeft="m"
      paddingRight="m"
      justifyContent="flex-end"
    >
      <IconButton
        variant="flat"
        size="medium"
        onClick={() => setIsOpen((prev) => !prev)}
        icon={<SettingsIcon color={Theme.palette.layout.onSurface.secondary} />}
      />
      {isOpen && (
        <S.Panel
          width="100%"
          padding="ml"
          paddingLeft="l"
          paddingRight="l"
          justifyContent="flex-end"
        >
          <Field title="AI Model">
            <SegmentedControl
              key={segmentedKey}
              whitespace="xl"
              onChange={handleModelChange}
              value={selectedModel}
              options={MODEL_OPTIONS}
            />
            <Modal open={isModalOpen} onClose={handleCancel}>
              <ModalContent>
                <Column spacing="l">
                  <Typography variant="H1" color="layout.onSurface.primary">
                    Are you sure you want to change AI model?
                  </Typography>
                  <Typography variant="Body" color="layout.onSurface.secondary">
                    If you change it, you’ll have to set entire prompt from the
                    start
                  </Typography>
                  <Row spacing="xl">
                    <TextButton
                      hierarchy="secondary"
                      size="medium"
                      label="Cancel"
                      onClick={handleCancel}
                    />
                    <Button
                      size="medium"
                      hierarchy="secondary"
                      variant="outlined"
                      label="Change AI model"
                      onClick={handleConfirm}
                    />
                  </Row>
                </Column>
              </ModalContent>
            </Modal>
          </Field>
        </S.Panel>
      )}
    </S.Wrapper>
  );
};
