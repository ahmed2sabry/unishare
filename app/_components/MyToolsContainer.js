"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyToolsAction } from "../_lib/actions/getMyToolsAction";
import FilterIcon from "./FilterIcon";
import Pagination from "./Pagination";
import Modal from "./Modal";
import Menus from "./Menus";
import { HiEye, HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useDeleteTool } from "../_lib/hooks/useDeleteTool";
import ConfirmDelete from "./ConfirmDelete";
import EditToolForm from "./EditToolForm";
import PublishForm, { PublishFormModal } from "./PublishForm";
import Spinner from "./Spinner";
import { BsTools } from "react-icons/bs";

function MyToolsContainer({ params, colleges, categories }) {
  const router = useRouter();
  const { isDeleting, deleteTool } = useDeleteTool();
  const { data, isLoading } = useQuery({
    queryKey: ["my-tools", params],
    queryFn: () => getMyToolsAction(params),
    placeholderData: (previousData) => previousData,
  });
  console.log(data);
  if (isLoading && !data) return <Spinner />;

  return (
    <div className="  flex flex-col gap-3">
      <div className="hidden md:flex items-center justify-between">
        <h3 className="text-base font-bold">My Listings</h3>
        <Modal>
          <Modal.Open opens="post">
            <button className=" inline-block  cursor-pointer px-4 py-2 rounded-xl text-white transition-all bg-primary-500 hover:bg-primary-600 text-sm font-semibold ">
              Add Post
            </button>
          </Modal.Open>
          <Modal.Window name="post">
            <PublishFormModal colleges={colleges} categories={categories} />
          </Modal.Window>
        </Modal>
      </div>
      {data?.items?.length === 0 ? (
        <div className="h-[50vh] flex flex-col justify-center items-center text-center px-4 gap-4">
          <div className="text-gray-300 text-6xl mb-2">
            <BsTools />
          </div>

          <h3 className="text-primary-500 text-2xl md:text-3xl font-semibold">
            you didn&apos;t publish any tools
          </h3>

          <p className="text-gray-light text-sm md:text-base max-w-sm">
            start publishing your tools
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-3 ${isLoading ? "opacity-50" : "opacity-100"} transition-opacity`}
        >
          <Menus>
            {data.items.map((item) => (
              <div
                key={item.id}
                className="p-4 grid grid-cols-[82px_1fr_auto] lg:grid-cols-[140px_1fr_auto] gap-2.5 shadow-item rounded-3xl items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-15.75 w-20.5 rounded-xl lg:h-27 lg:w-35"
                />
                <div className="flex flex-col gap-1.5 lg:gap-4">
                  <h3 className="text-sm font-normal lg:font-semibold lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-base font-semibold">
                    {item.dailyPrice} <span className="text-xs">EGP/day</span>
                  </p>
                  <p className="text-sm font-normal text-gray-light">⭐ 4.5</p>
                </div>
                <Modal>
                  <Menus.Menu>
                    <Menus.Toggle id={item.id} />
                    <Menus.List id={item.id}>
                      <Menus.Button
                        onClick={() => router.push(`/tools/${item.id}`)}
                        icon={<HiEye />}
                      >
                        see details
                      </Menus.Button>

                      {/* {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${item.id}`)}
                icon={<HiArrowDownOnSquare />}
              >
                check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                disabled={isCheckingout}
                onClick={() => checkout(item.id)}
                icon={<HiArrowUpOnSquare />}
              >
                check out
              </Menus.Button>
            )} */}

                      <Modal.Open opens="delete">
                        <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
                      </Modal.Open>

                      <Modal.Open opens="edit">
                        <Menus.Button icon={<HiOutlinePencil />}>
                          edit
                        </Menus.Button>
                      </Modal.Open>
                    </Menus.List>
                  </Menus.Menu>
                  <Modal.Window name="delete">
                    <ConfirmDelete
                      resourceName="tool"
                      onConfirm={() => deleteTool(item.id)}
                      disabled={isDeleting}
                    />
                  </Modal.Window>

                  <Modal.Window name="edit">
                    {/* <ConfirmDelete
                    resourceName="tool"
                    onConfirm={() => deleteTool(item.id)}
                    disabled={isDeleting}
                  /> */}
                    <EditToolForm
                      item={item}
                      categories={categories}
                      colleges={colleges}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            ))}
          </Menus>
        </div>
      )}

      <Pagination count={data?.totalCount} />
    </div>
  );
}

export default MyToolsContainer;
