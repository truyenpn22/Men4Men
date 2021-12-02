import React from "react"

const AddPostModal = () => {
  return (
    <>
      {/* ADD POST MODAL */}
      <div style={{ zIndex: "9999" }} className="modal fade" id="addPostModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Product</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select className="form-control">
                    <option value>Web Development</option>
                    <option value>Tech Gadgets</option>
                    <option value>Business</option>
                    <option value>Health &amp; Wellness</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="image"
                    />
                    <label htmlFor="image" className="custom-file-label">
                      Choose File
                    </label>
                  </div>
                  <small className="form-text text-muted">Max Size 3mb</small>
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <textarea
                    name="editor1"
                    className="form-control"
                    defaultValue={""}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPostModal
